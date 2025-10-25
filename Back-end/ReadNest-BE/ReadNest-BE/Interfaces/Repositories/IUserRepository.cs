using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<bool> IsUserExist(string userName);
        Task<User> GetUserByUserName(string userName);
        Task<UserWithRoles> GetUserWithRolesByUserName(string userName);
        Task UpdateToken(string userId, string token, DateTime tokenExpiry, string refreshToken, DateTime refreshTokenExpiry);
        Task RevokeToken(string userId);
    }
}
