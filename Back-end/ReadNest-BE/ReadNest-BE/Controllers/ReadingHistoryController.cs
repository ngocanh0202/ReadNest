using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_Enums;
using ReadNest_Models;
using System.Text.Json;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingHistoryController : ControllerBase
    {
        protected readonly IReadingHistoryRepository _readingHistory;
        protected readonly JwtService _jwtService;
        private readonly IDistributedCache _cache;
        public ReadingHistoryController(IDistributedCache cache, IReadingHistoryRepository repository, JwtService jwtService)
        {
            _readingHistory = repository;
            _cache = cache;
            _jwtService = jwtService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _readingHistory.GetReadingHistoriesByUserId(GetUserIdFromToken());
                var response = new Response<List<ReadingHistoryDto>>(result, "Load History successfully", true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReadingHistory readingHistory)
        {
            if (!CanRead(out var errorMessage))
            {
                return Unauthorized(errorMessage);
            }
            if (string.IsNullOrEmpty(readingHistory.NovelId))
            {
                return BadRequest("Novel is required");
            }
            try
            {
                var userUd = GetUserIdFromToken();
                var result = await _readingHistory.UpsertReadingHistory(GetUserIdFromToken(), readingHistory);
                var response = new Response<ReadingHistory>(result, "Update History successfully", true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected bool CanRead(out string errorMessage)
        {
            errorMessage = string.Empty;
            try
            {
                SetJwtToken();
                string roles = _jwtService.GetRoleFromToken() ?? "";

                bool isAdmin = Utils.Utils.IsRole(roles, RoleType.ADMIN);
                bool isAuthor = Utils.Utils.IsRole(roles, RoleType.AUTHOR);
                bool isReader = Utils.Utils.IsRole(roles, RoleType.READER);

                if (isAdmin || isAuthor || isReader)
                    return true;

                errorMessage = "You do not have permission to read this resource.";
                return false;
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }
        }

        protected void SetJwtToken()
        {
            string authHeader = Request.Headers["Authorization"].ToString();
            _jwtService.Token = authHeader;
        }

        protected string GetEntityName() => nameof(ReadingHistory).ToLower();

        protected string GetUserIdFromToken()
        {
            SetJwtToken();
            return _jwtService.GetUserIdFromToken()!;
        }
    }
}
