using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IRequestHandler<T>
    {
        Task<Response<PaginationData<List<T>>>> GetValue(string keyword, int page, int pageSize);
        Task<Response<T>> GetValueById(string id);
        Task<Response<T>> PostValue(T value);
        Task<Response<T>> PutValue(T value);
        Task<Response<bool>> DeleteValue(string id);
        Task<HttpResponseMessage> SendRequestWithRefreshAsync(Func<Task<HttpResponseMessage>> requestFunc);
    }
}
