using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Services
{
    public interface IFileService
    {
        Task<ImageResponse> UploadImageAsync(IFormFile file, string folder = "images");
        Task<bool> DeleteImageAsync(string filePath);
        Task<List<ImageResponse>> UploadMultipleImagesAsync(List<IFormFile> files, string folder = "images");
        Task<List<string>> GetListFileInFolderAsync(string folder = "images");
        string GetRootUploadsPath();
    }
}
