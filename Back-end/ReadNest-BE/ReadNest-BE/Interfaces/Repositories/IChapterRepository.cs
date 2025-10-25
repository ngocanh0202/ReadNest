using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IChapterRepository : IRepository<Chapter>
    {
        Task<bool> DeleteByVolumnId(string volumnId);
        Task<Chapter> GetNewChapterByNovelId(string novelId);
        Task<List<Chapter>> GetChaptersByVolumnId(string volumnId); 
        Task<DetailChapter> GetDetailChapterById(string chapterId);
        Task UpdateDateChapterById(string chapterId);
    }
}
