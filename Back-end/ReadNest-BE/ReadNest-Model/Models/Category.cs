namespace ReadNest_Models
{
    public class Category : BaseModel, ExtendModel
    {
        public string? Name { get; set; }
        public string? CreateBy { get ; set; }
        public string? UpdateBy { get; set; }
    }
}
