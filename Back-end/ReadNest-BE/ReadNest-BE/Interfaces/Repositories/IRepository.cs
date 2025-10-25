using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T> Create(T entity);
        Task<List<T>> CreateOrUpdateMany(List<T> entities);
        Task<T> CreateOrUpdate(T entity, string id);
        Task<List<T>> GetAll();
        Task<T> GetById(string id);
        Task<T> Update(T entity);
        Task<bool> Delete(T entity);
        Task<bool> DeleteRange(List<T> entities);
        Task<bool> SaveChange();
    }
}
