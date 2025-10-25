namespace ReadNest_Models
{
    public class UserResponse
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public bool? HasContributePermission { get; set; }
    }
}
