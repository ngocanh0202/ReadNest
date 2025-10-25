using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface INovelRepository : IRepository<Novel>
    {
        Task<DetailNovel> GetDetailNovelById(string id);
        Task UpdateDateNovelById(string novelId);
        Task<PaginationData<List<NovelResponese>>> GetNovelResponse(string? keyword, int page, int pageSize);
        Task<PaginationData<List<NovelResponese>>> GetNovelsFilter(NovelFilter filter);
        Task<List<OverviewNovel>> GetRandomNovels(int count);

    }
}
