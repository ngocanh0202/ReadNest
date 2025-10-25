using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReadNest_Models
{
    public class Chapter : BaseModel, ExtendModel
    {
        public string? Name { get; set; }
        public int? Order { get; set; }
        public string? VolumnId { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
    }
}
