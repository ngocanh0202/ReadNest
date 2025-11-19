using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IBookmarkRepository : IRepository<Bookmark>
    {
        Task<List<BookmarkDto>> GetBookmarkByUserId(string userId);
        Task<Bookmark> UpsertBookmark(string userId, Bookmark bookmark);
        Task<bool> DeleteBookmark(string chapterId);
    }
}
