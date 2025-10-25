﻿using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories;
using ReadNest_BE.Services;
using ReadNest_Models;
using System.Text.Json;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapterController : BaseController<Chapter>
    {
        IContentRepository _contentRepository;
        public ChapterController(IChapterRepository repository, JwtService jwtService, IContentRepository contentRepository) : base(repository, jwtService)
        {
            _contentRepository = contentRepository;
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetailById(string id)
        {
            if (!CanRead(out var errorMessage))
                return Unauthorized(errorMessage);
            try
            {
                DetailChapter result = await ((IChapterRepository)_repository).GetDetailChapterById(id);
                var response = new Response<DetailChapter>(result, "Get success", true);
                var json = JsonSerializer.Serialize(response);
                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("mutiple/chapter/{chapterId}/contents")]
        [EnableRateLimiting("upsert")]
        public async Task<IActionResult> PostMutiple([FromRoute] string chapterId, [FromBody] List<ContentDto> contents)
        {
            var entity = await _repository.GetById(chapterId);
            if (entity == null)
                return NotFound($"chapter not found");

            if (!IsAuthorized(entity, false, out var errorMessage, out var userId))
                return Unauthorized(errorMessage);

            try
            {
                var oldContents = await _contentRepository.GetContentsByChapterId(chapterId);
                await _contentRepository.DeleteRange(oldContents);
                List<Content> newContent = contents.Adapt<List<Content>>();
                var updatedEntity = PrepareEntityForUpdate(entity, entity, userId);
                var createdContents = await _contentRepository.CreateOrUpdateMany(newContent);
                var responeseContents = createdContents.Adapt<List<ContentDto>>();
                await ((IChapterRepository)_repository).Update(updatedEntity);
                return Ok(new Response<List<ContentDto>>(responeseContents, "Update contents for chapter successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
