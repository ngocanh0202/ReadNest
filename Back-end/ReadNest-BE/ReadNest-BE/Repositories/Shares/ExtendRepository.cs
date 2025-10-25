using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_BE.Utils;
using ReadNest_Models;

namespace ReadNest_BE.Repositories.Shares
{
    public class ExtendRepository<T> : IRepository<T> where T : BaseModel, ExtendModel
    {
        protected readonly JwtService _jwtService;
        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;
        public ExtendRepository(AppDbContext appDbContext, JwtService jwtService)
        {
            _context = appDbContext;
            _dbSet = _context.Set<T>();
            _jwtService = jwtService;
        }
        public virtual async Task<T> Create(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await SaveChange();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<T> CreateOrUpdate(T entity, string id)
        {
            try
            {
                var existingEntity = await _dbSet.Where(c => c.Id.Equals(id)).FirstOrDefaultAsync();

                if (existingEntity == null)
                {
                    entity.Id = Guid.NewGuid().ToString();
                    entity.CreateBy = _jwtService.GetUserIdFromToken();
                    entity.UpdateBy = _jwtService.GetUserIdFromToken();
                    entity.CreateDate = DateTime.UtcNow;
                    entity.UpdateDate = DateTime.UtcNow;
                    await _dbSet.AddAsync(entity);
                }
                else
                {
                    _context.Entry(existingEntity).CurrentValues.SetValues(entity);
                }

                await SaveChange();

                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<List<T>> CreateOrUpdateMany(List<T> entities)
        {
            IDbContextTransaction? transaction = null;
            try
            {
                transaction = await _context.Database.BeginTransactionAsync();

                foreach (var entity in entities)
                {
                    if (string.IsNullOrWhiteSpace(entity.Id))
                    {
                        entity.Id = Guid.NewGuid().ToString();
                        entity.CreateBy = _jwtService.GetUserIdFromToken();
                        entity.CreateDate = DateTime.UtcNow;
                    }

                    entity.UpdateBy = Utils.Utils.GenerateFieldUpdateBy(entity.UpdateBy!, _jwtService.GetUserIdFromToken()!);
                    entity.UpdateDate = DateTime.UtcNow;

                    await CreateOrUpdate(entity, entity.Id);
                }

                await SaveChange();
                await transaction.CommitAsync();
                return entities;
            }
            catch (Exception ex)
            {
                if (transaction != null) await transaction.RollbackAsync();
                throw new Exception(ex.Message, ex);
            }
        }
        public virtual async Task<bool> Delete(T entity)
        {
            _dbSet.Remove(entity);
            return await SaveChange();
        }

        public virtual async Task<bool> DeleteRange(List<T> entities)
        {
            IDbContextTransaction? transaction = null;
            try
            {
                transaction = _context.Database.BeginTransaction();
                foreach (var entity in entities)
                {
                    _dbSet.Remove(entity);
                }
                var result = await SaveChange();
                transaction.Commit();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public virtual async Task<List<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T> GetById(string id)
        {
            var entity = await _context.Set<T>().AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
            return entity!;
        }

        public virtual async Task<bool> SaveChange()
        {
            int changes = await _context.SaveChangesAsync();
            return changes > 0;
        }

        public virtual async Task<T> Update(T entity)
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
