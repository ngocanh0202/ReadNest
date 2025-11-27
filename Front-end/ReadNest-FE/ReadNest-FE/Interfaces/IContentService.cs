using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IContentService : IRequestHandler<Content>
    {
        Task<Response<List<Content>>> GetMutipleByChapterId(string chapterId);

    }
}
