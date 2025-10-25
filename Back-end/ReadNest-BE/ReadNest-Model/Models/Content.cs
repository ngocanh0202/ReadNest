using ReadNest_Enums;

namespace ReadNest_Models
{
    public class Content : BaseModel, ExtendModel
    {
        public string? P { get; set; }
        public string? ImageId { get; set; }
        public string? ImageUrl { get; set; }
        public int Order { get; set; }
        public string? ChapterId { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
    }
}
