namespace ReadNest_Models
{
    public class TranslationResponse
    {
        public string? P { get; set; }
        public long? PromptTokenCount { get; set; }
        public long? CandidatesTokenCount { get; set; }
        public long? TotalTokenCount { get; set; }
        public string? ModelVersion { get; set; }
    }
}
