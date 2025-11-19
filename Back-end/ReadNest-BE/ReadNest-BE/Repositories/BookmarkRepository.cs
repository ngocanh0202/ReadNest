using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Repositories
{
    public class BookmarkRepository : ExtendRepository<Bookmark>, IBookmarkRepository
    {
        IHttpContextAccessor _httpContextAccessor;
        public BookmarkRepository(IHttpContextAccessor httpContextAccessor,AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> DeleteBookmark(string chapterId)
        {
            if (string.IsNullOrWhiteSpace(chapterId))
                return false;

            try
            {
                var bookmark = await _dbSet
                    .Where(b => b.ChapterId == chapterId).ToListAsync();

                if (bookmark == null)
                    return false;

                _dbSet.RemoveRange(bookmark);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting bookmark: {ex.Message}", ex);
            }
        }

        public async Task<List<BookmarkDto>> GetBookmarkByUserId(string userId)
        {
            var sql = @"
                SELECT
                    b.Id,
                    b.NovelId AS NovelId,
                    n.Name AS NovelName,
                    i.ImagePath AS NovelImageUrl,
                    b.ChapterId AS ChapterId,
                    c.Name AS ChapterName,
                    b.ContentText AS ContentText,
                    b.CreateBy AS CreateBy,
                    b.UpdateBy AS UpdateBy
                FROM Bookmarks b
                LEFT JOIN Novels n ON n.Id = b.NovelId
                LEFT JOIN Chapters c ON c.Id = b.ChapterId
                LEFT JOIN Images i ON n.ImageId = i.Id
                WHERE b.CreateBy = {0}
                ORDER BY b.UpdateDate DESC";

            var results = await _context.Database
                .SqlQueryRaw<BookmarkDto>(sql, userId)
                .ToListAsync();

            var request = _httpContextAccessor.HttpContext?.Request;
            string baseUrl = $"{request?.Scheme}://{request?.Host}";

            foreach (var item in results)
            {
                if (!string.IsNullOrWhiteSpace(item.NovelImageUrl))
                    item.NovelImageUrl = $"{baseUrl}{item.NovelImageUrl}";
            }

            return results;
        }

        public async Task<Bookmark> UpsertBookmark(string userId, Bookmark bookmark)
        {
            try
            {
                bookmark.CreateBy ??= userId;

                Bookmark? existing = null;

                if (!string.IsNullOrWhiteSpace(bookmark.ChapterId))
                {
                    existing = await _dbSet.FirstOrDefaultAsync(b =>
                        b.NovelId == bookmark.NovelId &&
                        b.ChapterId == bookmark.ChapterId &&
                        b.ContentText == bookmark.ContentText &&
                        b.CreateBy == userId);
                }

                if (existing != null)
                {
                    existing.UpdateBy = bookmark.UpdateBy ?? userId;
                    existing.UpdateDate = DateTime.UtcNow;

                    _dbSet.Update(existing);
                }
                else
                {
                    bookmark.CreateBy = userId;
                    bookmark.CreateDate = DateTime.UtcNow;
                    bookmark.UpdateDate = DateTime.UtcNow;
                    bookmark.UpdateBy ??= userId;

                    await _dbSet.AddAsync(bookmark);
                    existing = bookmark;
                }

                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error upserting bookmark: {ex.Message}", ex);
            }
        }
    }
}
