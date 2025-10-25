using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_Models;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;

namespace ReadNest_BE.Repositories
{
    public class PromptRepository : ExtendRepository<Prompt>, IPromptRepository
    {
        public PromptRepository(AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
        }
    }
}
