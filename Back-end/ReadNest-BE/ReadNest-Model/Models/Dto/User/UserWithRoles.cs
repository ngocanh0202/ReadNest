namespace ReadNest_Models
{
    public class UserWithRoles
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? Token { get; set; }
        public DateTime TokenExpiryTime { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public List<string>? Roles { get; set; }
    }
}
