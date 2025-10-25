using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Services
{
    public interface IGeminiService
    {
        Task<GeminiResponse> GenerateContentAsync(string content, string prompt);

    }
}
