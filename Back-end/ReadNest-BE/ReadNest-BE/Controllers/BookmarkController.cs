using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using ReadNest_BE.Interfaces.Repositories;
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
                                    .Select(x => x.ContentText!)
                                    .Where(t => !string.IsNullOrWhiteSpace(t))
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
