namespace ReadNest_Models
{
    public class ReadingHistory : BaseModel, ExtendModel
    {
        public string NovelId { get; set; } = null!;
        public string VolumnId { get; set; } = null!;
        public string ChapterId { get; set; } = null!;
        public string? CreateBy { get ; set ; }
        public string? UpdateBy { get ; set ; }
    }
}
