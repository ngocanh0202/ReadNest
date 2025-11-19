using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadNest_Models
{
    public class BookmarkDto
    {
        public string? NovelId { get; set; }
        public string? NovelName { get; set; }
        public string? NovelImageUrl { get; set; }
        public string? ChapterId { get; set; }
        public string? ChapterName { get; set; }
        public string? ContentText { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
    }
}
