using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_Models;

namespace ReadNest_BE.Repositories.Shares
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        protected readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;
        public Repository(AppDbContext appDbContext)
        {
            _context = appDbContext;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> Create(T entity)
        {
            try
            {
                entity.Id = Guid.NewGuid().ToString();
                entity.CreateDate = DateTime.UtcNow;
                entity.UpdateDate = DateTime.UtcNow;
                await _dbSet.AddAsync(entity);
                await SaveChange();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public Task<List<T>> CreateMany(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public Task<T> CreateOrUpdate(T entity, string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> CreateOrUpdateMany(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(T entity)
        {
            _dbSet.Remove(entity);
            return await SaveChange();
        }

        public Task<bool> DeleteRange(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetById(string id)
        {
            var entity = await _context.Set<T>().AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
            return entity!;
        }

        public async Task<bool> SaveChange()
        {
            int changes = await _context.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<T> Update(T entity)
        {
            try
            {
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
