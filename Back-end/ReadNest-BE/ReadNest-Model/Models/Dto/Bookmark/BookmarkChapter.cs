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
        public List<string> ContentTexts { get; set; } = new();
    }
}
