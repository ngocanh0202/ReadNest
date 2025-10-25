namespace ReadNest_Models;

public class ContentDto : ExtendModel
{
    public string? Id { get; set; }
    public string? P { get; set; }
    public string? ImageId { get; set; }
    public string? ImageUrl { get; set; }
    public int Order { get; set; }
    public string? ChapterId { get; set; }
    public string? CreateBy { get ; set ; }
    public string? UpdateBy { get ; set ; }
}
