using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IContentRepository : IRepository<Content>
    {
        Task<bool> DeleteByChapterId(string chapterId);
        Task<List<Content>> GetContentsByChapterId(string chapterId);
    }
}
