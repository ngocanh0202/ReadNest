using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadNest_Models
{
    public class BookmarkChapter
    {
        public string? ChapterId { get; set; }
        public string? ChapterName { get; set; }
        public List<BookmarkContent> ContentTexts { get; set; } = new();
    }

    public class BookmarkContent
    {
        public string? BookmarkId { get; set; }
        public string? ContentText { get; set; }
    }
}
