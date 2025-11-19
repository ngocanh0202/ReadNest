
namespace ReadNest_Models
{
    public class BookmarkNovel
    {
        public string? NovelId { get; set; }
        public string? NovelName { get; set; }
        public string? NovelImageUrl { get; set; }
        public List<BookmarkChapter> Chapters { get; set; } = new();
    }
}
