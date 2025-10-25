namespace ReadNest_Models
{
    public class CategoryNovel : BaseModel, ExtendModel
    {
        public string? NovelId { get; set; }
        public string? CategoryId { get; set; }
        public string? CreateBy { get ; set ; }
        public string? UpdateBy { get ; set ; }
    }
}
