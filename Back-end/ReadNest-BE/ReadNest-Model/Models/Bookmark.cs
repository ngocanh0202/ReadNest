namespace ReadNest_Models
{
    public class Bookmark : BaseModel, ExtendModel
    {
        public string? NovelId { get; set; }
        public string? ChapterId { get; set; }
        public string? ContentText { get; set; }
        public string? CreateBy { get ; set ; }
        public string? UpdateBy { get ; set ; }
    }
}
