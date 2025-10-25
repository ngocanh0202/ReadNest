using Microsoft.EntityFrameworkCore;
using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface ICategoryNovelRepository : IRepository<CategoryNovel>
    {
        Task<bool> DeleteByNovelId(string novelId);
        Task<List<CategoryNovel>> GetCategoryNovelsByNovelId(string novelId);
        Task CreateRangeWithNovelId(List<Category> categoriries, string novelId);
        Task<CategoryNovel> GetCategoriryNovelsByCategoriryIdAndNoveId(string categoryId, string novelId);
    }
}
