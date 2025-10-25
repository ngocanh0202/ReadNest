using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Repositories
{
    public class ContentRepository : ExtendRepository<Content>, IContentRepository
    {

        public ContentRepository(AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
        }

        public async Task<bool> DeleteByChapterId(string chapterId)
        {
            var items = await _dbSet.Where(c => c.ChapterId!.Equals(chapterId)).ToListAsync();

            if (items.Count == 0)
                return true;

            _dbSet.RemoveRange(items);
            var result = await SaveChange();
            return result;
        }

        public async Task<List<Content>> GetContentsByChapterId(string chapterId)
        {
            List<Content> contents = await _dbSet.Where(c => c.ChapterId == chapterId).OrderBy(c => c.Order).ToListAsync();
            return contents;
        }
    }
}
