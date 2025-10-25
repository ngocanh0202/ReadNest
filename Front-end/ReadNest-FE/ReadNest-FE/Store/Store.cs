using ReadNest_Models;
namespace ReadNest_FE.Store
{
    public class Store
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public string? UserName { get; set; }
        public string? Host { get; set; }
        public bool? HasContributePermission { get; set; }
        public bool IsModeAction { get; set; } = false;
    }
}
