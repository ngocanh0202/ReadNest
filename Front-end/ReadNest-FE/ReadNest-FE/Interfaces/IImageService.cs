using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IImageService : IRequestHandler<Image>
    {
        Task<Response<Image>> PostSingle(FileStream file, string contentType, string folder = "images");
        Task<Response<List<Image>>> PostMutiple(FileStream[] files, string folder = "images");
        Task<Response<bool>> DeleteMutiple(List<string> fileId);
    }
}
