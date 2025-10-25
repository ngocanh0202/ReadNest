using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Repositories
{
    public class CategoryRepository : ExtendRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
        }
    }
}
