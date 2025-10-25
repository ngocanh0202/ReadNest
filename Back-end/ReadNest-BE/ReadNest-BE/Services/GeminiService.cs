using ReadNest_BE.Interfaces.Services;
using ReadNest_Models;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReadNest_BE.Services
{
    public class GeminiService : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _model;
        public GeminiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Gemini:ApiKey"]
                ?? throw new ArgumentNullException("Gemini API Key is not configured");
            _model = configuration["Gemini:Model"] ?? "gemini-2.5-flash";

            _httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com/");
        }
        public async Task<GeminiResponse> GenerateContentAsync(string content, string prompt)
        {
            var contents = new List<GeminiContent>
            {
                new GeminiContent
                {
                    Parts = new List<GeminiPart>
                    {
                        new GeminiPart { Text = content }
                    },
                }
            };

            var systemInstruction = new System_instruction
            {
                Parts = new List<GeminiPart>
                {
                    new GeminiPart { Text = prompt }
                }
            };

            return await GenerateContentAsync(contents, systemInstruction);
        }

        public async Task<GeminiResponse> GenerateContentAsync(List<GeminiContent> contents, System_instruction system_Instructions)
        {
            var request = new GeminiRequest
            {
                System_instruction = system_Instructions,
                Contents = contents
            };

            var jsonContent = JsonSerializer.Serialize(request, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            });

            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var url = $"v1beta/models/{_model}:generateContent?key={_apiKey}";

            using var cts = new CancellationTokenSource(TimeSpan.FromMinutes(5));
            var response = await _httpClient.PostAsync(url, httpContent, cts.Token);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();

            var geminiResponse = JsonSerializer.Deserialize<GeminiResponse>(responseContent, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            });

            return geminiResponse ?? throw new Exception("Failed to deserialize Gemini response");
        }

    }
}
