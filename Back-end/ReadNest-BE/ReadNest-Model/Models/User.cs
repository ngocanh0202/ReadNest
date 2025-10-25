using System.ComponentModel.DataAnnotations;

namespace ReadNest_Models
{
    public class User : BaseModel
    {
        [Required]
        [MaxLength(256)]
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime TokenExpiryTime { get; set; }
    }
}
