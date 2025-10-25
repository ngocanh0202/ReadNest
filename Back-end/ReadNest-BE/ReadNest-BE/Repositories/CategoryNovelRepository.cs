using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Repositories
{
    public class CategoryNovelRepository : ExtendRepository<CategoryNovel>, ICategoryNovelRepository
    {
        ICategoryRepository _categoryRepository;
        public CategoryNovelRepository(ICategoryRepository categoryRepository, AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task CreateRangeWithNovelId(List<Category> categories, string novelId)
        {
            try
            {
                var categoryNovels = categories.Select(c => new CategoryNovel
                {
                    NovelId = novelId,
                    CategoryId = c.Id
                }).ToList();

                await DeleteByNovelId(novelId);
                await CreateOrUpdateMany(categoryNovels);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> DeleteByNovelId(string novelId)
        {
            var items = await _context.CategorieNovels
                .Where(cn => cn.NovelId == novelId)
                .ToListAsync();

            if (items.Count == 0)
                return true;

            _context.CategorieNovels.RemoveRange(items);
            var result = await SaveChange();
            return result;
        }


        public async Task<CategoryNovel> GetCategoriryNovelsByCategoriryIdAndNoveId(string categoryId, string novelId)
        {
            var result = await _dbSet.Where(c => c.NovelId == novelId && c.CategoryId == categoryId).FirstOrDefaultAsync();
            return result!;
        }

        public async Task<List<CategoryNovel>> GetCategoryNovelsByNovelId(string novelId)
        {
            return await _dbSet.Where(cn => cn.NovelId == novelId).ToListAsync();
        }
    }
}
