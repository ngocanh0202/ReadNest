using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IAuthService
    {
        Task<Response<UserResponse>> Login(UserLogin userLogin);
        Task<Response<UserResponse>> Register(UserLogin userRegister);
        Task<Response<bool>> ChangePassword(UserChangePassword userRegister);
        Task<Response<UserResponse>> Delete(string userId);
        Task<Response<UserResponse>> RefreshTokenAsync();
        Task Logout();
    }
}
