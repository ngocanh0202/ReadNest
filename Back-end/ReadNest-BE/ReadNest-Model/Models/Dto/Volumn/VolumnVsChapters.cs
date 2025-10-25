namespace ReadNest_Models
{
    public class VolumnVsChapters
    {
        public Volumn? Volumn { get; set; }
        public List<Chapter>? Chapters { get; set; }
        public bool? IsExpanded { get; set; } = true;
    }
}
