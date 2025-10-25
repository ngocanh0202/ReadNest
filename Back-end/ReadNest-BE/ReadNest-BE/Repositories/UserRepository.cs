using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_Models;
using ReadNest_BE.Repositories.Shares;
using Mapster;

namespace ReadNest_BE.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }

        public async Task<User> GetUserByUserName(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }
            return user;
        }

        public async Task<UserWithRoles> GetUserWithRolesByUserName(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            var userRoles = _context.UserRoles.Where(ur => ur.UserId == user.Id);
            var roles = from ur in userRoles
                        join r in _context.Roles on ur.RoleId equals r.Id
                        select r.NameRole.ToString();

            var userWithRoles = user.Adapt<UserWithRoles>();
            userWithRoles.Roles = roles.ToList();

            return userWithRoles ?? throw new Exception("Can't Find User");
        }

        public async Task<bool> IsUserExist(string userName)
        {
            bool exists = await _context.Users.AnyAsync(u => u.UserName == userName);
            return exists;
        }

        public async Task RevokeToken(string userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    throw new Exception("User not found");

                user.Token = null;
                user.TokenExpiryTime = default;
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error revoking token: {ex.Message}");
            }
        }

        public async Task UpdateToken(string userId, string token, DateTime tokenExpiry, string refreshToken, DateTime refreshTokenExpiry)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    throw new Exception("User not found");

                user.Token = token;
                user.TokenExpiryTime = tokenExpiry;
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = refreshTokenExpiry;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating token: {ex.Message}");
            }
        }
    }
}
