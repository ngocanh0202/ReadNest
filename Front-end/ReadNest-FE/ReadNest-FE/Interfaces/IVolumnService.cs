using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IVolumnService : IRequestHandler<Volumn>
    {
        Task<Response<List<VolumnContent>>> GetVolumnContentByChapterId(string chapterId);
    }
}
