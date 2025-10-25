using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IVolumnRepository : IRepository<Volumn>
    {
        Task<List<Volumn>> GetVolumesByNovelId(string novelId);
        Task<bool> DeleteByNovelId(string novelId);
        Task<List<VolumnContent>> GetVolumnContentsByChapterId(string chapterId);
    }
}
