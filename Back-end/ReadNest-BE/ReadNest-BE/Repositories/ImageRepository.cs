using ReadNest_BE.Exceptions;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Interfaces.Services;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;

namespace ReadNest_BE.Repositories
{
    public class ImageRepository : ExtendRepository<Image>, IImageRepository
    {
        IHttpContextAccessor _httpContextAccessor;
        public ImageRepository(IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext, JwtService jwtService) : base(appDbContext, jwtService)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override async Task<Image> GetById(string id)
        {
            Image? entity = await _dbSet.FindAsync(id);
            if(entity != null)
            {
                var request = _httpContextAccessor.HttpContext?.Request;
                string baseUrl = $"{request?.Scheme}://{request?.Host}";
                entity.ImageUrl = $"{baseUrl}{entity.ImagePath}";
            }
            return entity!;
        }

        public override async Task<bool> Delete(Image entity)
        {
            try
            {
                _dbSet.Remove(entity);
                return await SaveChange();
            }
            catch
            {
                return false;
            }
        }


    }
}
