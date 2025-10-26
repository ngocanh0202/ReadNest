using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("test-environment")]
        public IActionResult TestEnvironment([FromServices] IWebHostEnvironment env)
        {
            return Ok(new
            {
                Environment = env.EnvironmentName,
                IsDevelopment = env.IsDevelopment(),
                ContentRootPath = env.ContentRootPath
            });
        }
    }
}
