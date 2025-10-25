using ReadNest_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadNest_Model
{
    public class ReadingHistory : BaseModel
    {
        public string UserId { get; set; } = null!;
        public string NovelId { get; set; } = null!;
        public string VolumnId { get; set; } = null!;
        public string ChapterId { get; set; } = null!;
        public string ImageId { get; set; } = null!;
    }
}
