using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_Models;
using System.Text.Json;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolumnController : BaseController<Volumn>
    {
        private readonly IDistributedCache _cache;
        public VolumnController(IDistributedCache cache, IVolumnRepository repository, JwtService jwtService) : base(repository, jwtService)
        {
            _cache = cache;
        }

        [HttpGet("VolumnContent")]
        public async Task<IActionResult> GetVolumnContentByChapterId([FromQuery] string chapterId)
        {
            if (!CanRead(out var errorMessage))
            {
                return Unauthorized(errorMessage);
            }
            if (chapterId == null)
            {
                return NotFound();
            }
            try
            {
                var key = $"volumn:{Utils.Utils.HashKey($"{chapterId}")}";
                var cached = await _cache.GetStringAsync(key);
                if (!string.IsNullOrEmpty(cached))
                {
                    var cachedObj = JsonSerializer.Deserialize<Response<List<VolumnContent>>>(cached);
                    return Ok(cachedObj);
                }
                var result = await ((IVolumnRepository)_repository).GetVolumnContentsByChapterId(chapterId);
                var response = new Response<List<VolumnContent>>(result, "Load Table of content successfully", true);
                var json = JsonSerializer.Serialize(response);

                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                };

                await _cache.SetStringAsync(key, json, options);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
