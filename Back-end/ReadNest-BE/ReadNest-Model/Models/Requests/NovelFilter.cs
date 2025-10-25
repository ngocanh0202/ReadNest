using ReadNest_Enums;

namespace ReadNest_Models
{
    public class NovelFilter
    {
        public string? NameNovel { get; set; }
        public string? Author { get; set; }
        public string? Categories { get; set; }
        public int? Page { get; set; } = 1;
        public int? PageSize { get; set; } = 5;
        public NovelStatus? NovelStatus { get; set; }
    }
}
