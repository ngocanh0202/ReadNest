using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IChapterService : IRequestHandler<Chapter>
    {
        Task<Response<DetailChapter>> GetDetailChapterById(string chapterId);
        Task<Response<List<Content>>> PostMutiple(List<Content> contents, string chapterId);
    }
}
