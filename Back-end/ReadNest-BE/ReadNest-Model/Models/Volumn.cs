namespace ReadNest_Models
{
    public class Volumn : BaseModel, ExtendModel
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageId { get; set; }
        public string? ImageUrl { get; set; }
        public int? Order { get; set; }
        public string? NovelId { get; set; }
        public string? CreateBy { get ; set ; }
        public string? UpdateBy { get ; set ; }
    }
}
