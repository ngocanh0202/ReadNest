using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IBookmarkService : IRequestHandler<Bookmark>
    {
        Task<Response<List<BookmarkNovel>>> Get();
        Task<Response<Bookmark>> Post(Bookmark readingHistory);
    }
}
