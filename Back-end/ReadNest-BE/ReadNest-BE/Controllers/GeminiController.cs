using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadNest_BE.Interfaces.Services;
using ReadNest_BE.Services;
using ReadNest_Enums;
using ReadNest_Models;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GeminiController : ControllerBase
    {
        private readonly IGeminiService _geminiService;
        private readonly JwtService _jwtService;
        public GeminiController(IGeminiService geminiService, JwtService jwtService)
        {
            _geminiService = geminiService;
            _jwtService = jwtService;
        }

        [HttpPost("translator")]
        public async Task<IActionResult> GenerateContent([FromBody] TranslationRequest novelTranslator)
        {
            if (!IsAdminOrAuthor())
                return BadRequest("You don't permision to use Trans AI");

            if (string.IsNullOrWhiteSpace(novelTranslator.Content))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            try
            {
                var response = await _geminiService.GenerateContentAsync(novelTranslator.Content, novelTranslator.Prompt);
                var translator = new TranslationResponse
                {
                    P = response.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text,
                    PromptTokenCount = response.UsageMetadata?.PromptTokenCount,
                    CandidatesTokenCount = response.UsageMetadata?.CandidatesTokenCount,
                    TotalTokenCount = response.UsageMetadata?.TotalTokenCount,
                    ModelVersion = response.ModelVersion
                };
                return Ok(new Response<TranslationResponse>(translator, "Translation successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected bool IsAdminOrAuthor()
        {
            SetJwtToken();
            string roles = _jwtService.GetRoleFromToken()!;
            bool isAdmin = Utils.Utils.IsRole(roles, RoleType.ADMIN);
            bool isAuthor = Utils.Utils.IsRole(roles, RoleType.AUTHOR);
            return isAdmin || isAuthor;
        }

        protected void SetJwtToken()
        {
            string authHeader = Request.Headers["Authorization"].ToString();
            _jwtService.Token = authHeader;
        }
    }
}
