namespace ReadNest_Models
{
    public class ImageResponse
    {
        public string ImageName { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public long ImageSize { get; set; }
        public string ContentType { get; set; } = string.Empty;
    }
}
