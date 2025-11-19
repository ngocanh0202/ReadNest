using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Enums;
using ReadNest_Models;

namespace ReadNest_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        protected readonly IBookmarkRepository _bookmarkRepository;
        protected readonly JwtService _jwtService;
        private readonly IDistributedCache _cache;
        public BookmarkController(IDistributedCache cache, IBookmarkRepository repository, JwtService jwtService)
        {
            _bookmarkRepository = repository;
            _cache = cache;
            _jwtService = jwtService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var bookmarkDtos = await _bookmarkRepository.GetBookmarkByUserId(GetUserIdFromToken());

                var result = bookmarkDtos
                    .GroupBy(b => new { b.NovelId, b.NovelName, b.NovelImageUrl })
                    .Select(novelGroup => new BookmarkNovel
                    {
                        NovelId = novelGroup.Key.NovelId,
                        NovelName = novelGroup.Key.NovelName,
                        NovelImageUrl = novelGroup.Key.NovelImageUrl,

                        Chapters = novelGroup
                            .GroupBy(c => new { c.ChapterId, c.ChapterName })
                            .Select(chapterGroup => new BookmarkChapter
                            {
                                ChapterId = chapterGroup.Key.ChapterId,
                                ChapterName = chapterGroup.Key.ChapterName,
                                ContentTexts = chapterGroup
                                    .Select(x => new BookmarkContent
                                    {
                                        BookmarkId = x.Id,
                                        ContentText = x.ContentText
                                    })
                                    .Where(t => !string.IsNullOrWhiteSpace(t.ContentText))
                                    .ToList()
                            })
                            .ToList()
                    })
                    .ToList();

                var response = new Response<List<BookmarkNovel>>(result, "Load History successfully", true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(string id)
        {
            var entity = await _bookmarkRepository.GetById(id);
            if (entity == null)
                return NotFound($"{typeof(Bookmark).Name} not found");

            if (!IsAuthorized(entity, false, out var errorMessage, out var userId))
                return Unauthorized(errorMessage);

            try
            {
                var result = await _bookmarkRepository.Delete(entity);
                if (!result)
                    return BadRequest("Delete Failed");
                return Ok(new Response<bool>(result, $"{typeof(Bookmark).Name} deleted successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bookmark bookmark)
        {
            if (!CanRead(out var errorMessage))
            {
                return Unauthorized(errorMessage);
            }
            if (string.IsNullOrEmpty(bookmark.NovelId))
            {
                return BadRequest("Novel is required");
            }
            if (string.IsNullOrEmpty(bookmark.ChapterId))
            {
                return BadRequest("Chapter is required");
            }
            try
            {
                var userUd = GetUserIdFromToken();
                var result = await _bookmarkRepository.UpsertBookmark(GetUserIdFromToken(), bookmark);
                var response = new Response<Bookmark>(result, "Update bookmark successfully", true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected bool IsAuthorized(Bookmark entity, bool isCreateOperation, out string errorMessage, out string userId)
        {
            errorMessage = string.Empty;
            try
            {
                string Id = GetUserIdFromToken();
                string roles = _jwtService.GetRoleFromToken()!;
                userId = Id;
                bool isAdmin = Utils.Utils.IsRole(roles, RoleType.ADMIN);
                bool isAuthor = Utils.Utils.IsRole(roles, RoleType.AUTHOR);

                if (isAdmin)
                    return true;

                if (isCreateOperation)
                {
                    if (isAuthor)
                        return true;

                    errorMessage = $"You don't have permission to create {GetEntityName()}";
                    return false;
                }

                if (entity is null)
                    return false;

                bool hasPermission = Utils.Utils.CheckIdInUpdateByAndCreateBy(
                    entity.CreateBy!,
                    entity.UpdateBy!,
                    Id
                );

                if (hasPermission && isAuthor)
                    return true;

                if (!hasPermission)
                {
                    errorMessage = $"You don't have permission to modify {GetEntityName()} with Id {entity.Id}";
                    return false;
                }

                errorMessage = $"You don't have sufficient role to perform this action";
                return false;
            }
            catch (ForbiddenException ex)
            {
                errorMessage = ex.Message;
                userId = string.Empty;
                return false;
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
