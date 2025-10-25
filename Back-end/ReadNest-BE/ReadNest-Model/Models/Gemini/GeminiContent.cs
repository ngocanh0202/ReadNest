namespace ReadNest_Models
{
    public class GeminiRequest
    {
        public System_instruction System_instruction { get; set; } = new();
        public List<GeminiContent> Contents { get; set; } = new();
    }
    public class System_instruction
    {
        public List<GeminiPart> Parts { get; set; } = new();
    }
    public class GeminiContent
    {
        public List<GeminiPart> Parts { get; set; } = new();
        public string? Role { get; set; }
    }

    public class GeminiPart
    {
        public string? Text { get; set; }
    }

    public class GeminiCandidate
    {
        public GeminiContent? Content { get; set; }
        public string? FinishReason { get; set; }
    }

    public class GeminiResponse
    {
        public List<GeminiCandidate>? Candidates { get; set; }
        public GeminiUsageMetadata? UsageMetadata { get; set; }
        public string? ModelVersion { get; set; }
    }

    public class GeminiUsageMetadata
    {
        public int PromptTokenCount { get; set; }
        public int CandidatesTokenCount { get; set; }
        public int TotalTokenCount { get; set; }
    }

    public class GeminiSafetyRating
    {
        public string? Category { get; set; }
        public string? Probability { get; set; }
    }
}
