using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_Models;
using System.Text.Json;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        private readonly IDistributedCache _cache;
        public CategoryController(IDistributedCache cache, ICategoryRepository repository, JwtService jwtService) : base(repository, jwtService)
        {
            _cache = cache;
        }
        [HttpGet]
        public override async Task<IActionResult> Get([FromQuery] string? keyword, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            if (!CanRead(out var errorMessage))
                return Unauthorized(errorMessage);
            var key = $"category:{Utils.Utils.HashKey($"{keyword}:{page}:{pageSize}")}";
            var cached = await _cache.GetStringAsync(key);
            if (!string.IsNullOrEmpty(cached))
            {
                var cachedObj = JsonSerializer.Deserialize<Response<PaginationData<List<Category>>>>(cached);
                return Ok(cachedObj);
            }
            try
            {
                var result = await base.Get(keyword, page, pageSize);

                if (result is OkObjectResult okResult)
                {
                    var json = JsonSerializer.Serialize(okResult.Value);

                    var options = new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                    };

                    await _cache.SetStringAsync(key, json, options);
                }

                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
