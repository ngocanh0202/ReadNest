using ReadNest_BE.Interfaces.Services;
using ReadNest_Models;
using System.IO;

namespace ReadNest_BE.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long _maxFileSize = 10 * 1024 * 1024;
        private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };

        public FileService(
                        IWebHostEnvironment environment, 
                        IHttpContextAccessor httpContextAccessor
        )
        {
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ImageResponse> UploadImageAsync(IFormFile file, string folder = "images")
        {
            try
            {
                ValidateFile(file);

                string uploadsFolder = Path.Combine(_environment.ContentRootPath, "Uploads", folder);
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string fileExtension = Path.GetExtension(file.FileName).ToLower();
                string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                var request = _httpContextAccessor.HttpContext?.Request;
                string baseUrl = $"{request?.Scheme}://{request?.Host}";
                string fileUrl = $"{baseUrl}/Uploads/{folder}/{uniqueFileName}";

                return new ImageResponse
                {
                    ImageName = uniqueFileName,
                    ImagePath = $"/Uploads/{folder}/{uniqueFileName}",
                    ImageUrl = fileUrl,
                    ImageSize = file.Length,
                    ContentType = file.ContentType
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading file: {ex.Message}", ex);
            }
        }

        public async Task<List<ImageResponse>> UploadMultipleImagesAsync(List<IFormFile> files, string folder = "images")
        {
            var responses = new List<ImageResponse>();

            foreach (var file in files)
            {
                var response = await UploadImageAsync(file, folder);
                responses.Add(response);
            }

            return responses;
        }

        public Task<bool> DeleteImageAsync(string filePath)
        {
            try
            {
                string fullPath = Path.Combine(
                    _environment.ContentRootPath,
                    filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar)
                );

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                    return Task.FromResult(true);
                }

                return Task.FromResult(false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting file: {ex.Message}", ex);
            }
        }

        private void ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("File is empty or null");
            }

            if (file.Length > _maxFileSize)
            {
                throw new ArgumentException($"File size exceeds maximum allowed size of {_maxFileSize / 1024 / 1024}MB");
            }

            string fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!_allowedExtensions.Contains(fileExtension))
            {
                throw new ArgumentException($"File type {fileExtension} is not allowed. Allowed types: {string.Join(", ", _allowedExtensions)}");
            }

            var allowedMimeTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp" };
            if (!allowedMimeTypes.Contains(file.ContentType.ToLower()))
            {
                throw new ArgumentException("Invalid file content type");
            }
        }

        public async Task<List<string>> GetListFileInFolderAsync(string folder = "images")
        {
            string uploadsFolder = Path.Combine(_environment.ContentRootPath, "Uploads", folder);

            if (!Directory.Exists(uploadsFolder))
                return new List<string>();

            var files = Directory.GetFiles(uploadsFolder).ToList();
            return await Task.FromResult(files);
        }

        public string GetRootUploadsPath()
        {
            return Path.Combine(_environment.ContentRootPath, "Uploads");
        }
    }
}