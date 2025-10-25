using Microsoft.IdentityModel.Tokens;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Handlers;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_Enums;
using ReadNest_Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ReadNest_BE.Services
{
    public class JwtService(IConfiguration configuration, IUserRepository userRepository)
    {
        public bool IsComputer { get; set; }
        private string? token;
        public string? Token
        {
            get { return token; }
            set { token = value; }
        }
        private readonly IConfiguration _configuration = configuration;
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<UserResponse?> Authenticate(UserLogin user)
        {
            if (string.IsNullOrWhiteSpace(user.UserName) || string.IsNullOrWhiteSpace(user.Password))
                throw new Exception("Username or password is empty");
            var existingUser = default(UserWithRoles?);
            try
            {
                existingUser = await _userRepository.GetUserWithRolesByUserName(user.UserName);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            if (existingUser == null || !PasswordHandler.VerifyPassword(user.Password, existingUser.PasswordHash!))
            {
                throw new Exception("Password incorrect!!!");
            }
            var roleNames = existingUser.Roles;
            var roles = string.Join(';', roleNames!);
            DateTime outTokenExpiryTimeStamp;
            var tokenString = GenerateToken(existingUser.Id!, existingUser.UserName!, roles, out outTokenExpiryTimeStamp);

            var refreshToken = GenerateRefreshToken();
            var refreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("Jwt:RefreshTokenValidityInDays"));

            try
            {
                await _userRepository.UpdateToken(existingUser.Id!, tokenString, outTokenExpiryTimeStamp, refreshToken, refreshTokenExpiryTime);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return new UserResponse()
            {
                Id = existingUser.Id,
                UserName = existingUser.UserName,
                Token = tokenString,
                RefreshToken = refreshToken,
                HasContributePermission = roleNames?.Any(r => r.Equals(RoleType.ADMIN.ToString()) || r.Equals(RoleType.AUTHOR.ToString()))
            };
        }

        public async Task<UserResponse?> RefreshToken(string accessToken, string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(accessToken) || string.IsNullOrWhiteSpace(refreshToken))
                throw new Exception("Access token or refresh token is empty");

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
                throw new Exception("Invalid access token");

            var userName = principal.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrWhiteSpace(userName))
                throw new Exception("Invalid token claims");

            UserWithRoles? existingUser;
            try
            {
                existingUser = await _userRepository.GetUserWithRolesByUserName(userName);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            if (existingUser == null)
                throw new Exception("User not found");

            if (existingUser.RefreshToken != refreshToken || existingUser.RefreshTokenExpiryTime <= DateTime.UtcNow)
                throw new Exception("Invalid or expired refresh token");

            var roleNames = existingUser.Roles;
            var roles = string.Join(';', roleNames!);
            DateTime outTokenExpiryTimeStamp;
            var newAccessToken = GenerateToken(existingUser.Id!, existingUser.UserName!, roles, out outTokenExpiryTimeStamp);
            var newRefreshToken = GenerateRefreshToken();
            var refreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("Jwt:RefreshTokenValidityInDays"));

            try
            {
                await _userRepository.UpdateToken(existingUser.Id!, newAccessToken, outTokenExpiryTimeStamp, newRefreshToken, refreshTokenExpiryTime);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return new UserResponse()
            {
                Id = existingUser.Id,
                UserName = existingUser.UserName,
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                HasContributePermission = roles.Any(r => r.Equals(RoleType.ADMIN) || r.Equals(RoleType.AUTHOR))
            };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public string GenerateToken(string userId, string userName, string roles, out DateTime outTokenExpiryTimeStamp)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName),
                    new Claim(ClaimTypes.Role, roles)
                };
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = _configuration["Jwt:Key"];
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenValidFor = _configuration.GetValue<int>("Jwt:TokenValidityInMinutes");
            var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(Convert.ToDouble(tokenValidFor));
            outTokenExpiryTimeStamp = tokenExpiryTimeStamp;

            var tokeOptions = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    expires: tokenExpiryTimeStamp,
                    signingCredentials: signinCredentials
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public ClaimsPrincipal? GetClaimsPrincipal()
        {
            if (Token == null) return null;
            if (Token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                Token = Token.Substring("Bearer ".Length).Trim();
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

            try
            {
                var principal = tokenHandler.ValidateToken(Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                return principal;
            }
            catch (SecurityTokenExpiredException)
            {
                throw new ForbiddenException("Token expired");
            }
            catch (Exception)
            {
                throw new ForbiddenException("Invalid token");
            }
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = false, 
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;
                if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> RevokeToken(string userId)
        {
            try
            {
                await _userRepository.RevokeToken(userId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool IsTokenValid()
        {
            var principal = GetClaimsPrincipal();
            return principal != null;
        }
        public string? GetRoleFromToken()
        {
            ClaimsPrincipal? principal = GetClaimsPrincipal();
            if (principal == null)
                return null;
            var role = principal.FindFirst(ClaimTypes.Role)?.Value;
            return role;
        }

        public string? GetUserIdFromToken()
        {
            ClaimsPrincipal? principal = GetClaimsPrincipal();
            if (principal == null)
                return null;
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return userId;
        }

    }
}
