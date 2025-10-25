using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_Models;
using ReadNest_BE.Repositories.Shares;

namespace ReadNest_BE.Repositories
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
    }
}