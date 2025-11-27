namespace ReadNest_Models
{ 
    public class ChapterOverview
    {
        public string? Id { get; set; }
        public string? ChapterName { get; set; }
        public string? VolumnId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? VolumnName { get; set; }
        public string? NovelId { get; set; }
        public string? ChapterType { get; set; }
    }
    public class DetailChapter
    {
        public ChapterOverview? CurrentChapter { get; set; }
        public ChapterOverview? PrevChapter { get; set; }
        public ChapterOverview? NextChapter { get; set; }
        public List<Content>? Contents { get; set; }
        public string? WordsLengths { get; set; }
    }
}
