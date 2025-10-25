namespace ReadNest_Models
{
    public class Prompt : BaseModel, ExtendModel
    {
        public string? P { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
    }
}
