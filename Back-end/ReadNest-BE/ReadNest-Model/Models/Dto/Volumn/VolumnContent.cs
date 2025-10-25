namespace ReadNest_Models
{
    public class VolumnContent
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? NovelId { get; set; }
        public bool? IsExpanded { get; set; } = true;
        public List<ChapterName>? Chapters { get; set; } = new List<ChapterName>();
    }

    public class ChapterName
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
    }

    public class VolumeChapterRow
    {
        public string? VolumnId { get; set; }
        public string? VolumnName { get; set; }
        public string? NovelId { get; set; }
        public string? ChapterId { get; set; }
        public string? ChapterName { get; set; }
    }
}
