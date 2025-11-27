using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : BaseController<Content>
    {
        IImageRepository _imageRepository;
        public ContentController(IContentRepository repository, JwtService jwtService, IImageRepository imageRepository) : base(repository, jwtService)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet("mutiple/{chapterId}")]
        public async Task<ActionResult<Response<List<Content>>>> GetMutiple([FromRoute] string chapterId)
        {
            if (!CanRead(out var errorMessage))
                return Unauthorized(errorMessage);
            try
            {
                var contents = await ((IContentRepository)_repository).GetContentsByChapterId(chapterId);

                List<Content> result = new List<Content>();

                foreach (var c in contents)
                {
                    var response = c.Adapt<Content>();

                    if (!string.IsNullOrWhiteSpace(c.ImageId))
                    {
                        var image = await _imageRepository.GetById(c.ImageId);
                        if (image != null)
                        {
                            response.ImageUrl = image.ImageUrl;
                        }
                    }

                    result.Add(response);
                }

                return Ok(new Response<List<Content>>(result, "Get contents for chapter successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
