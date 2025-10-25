using Microsoft.AspNetCore.Components;
using ReadNest_FE.Interfaces;
using ReadNest_Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReadNest_FE.Services.Features
{
    public class ImageService : RequestHandler<Image>, IImageService
    {
        public ImageService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService) : base(httpClient, uiEventService, store, navigation, authService)
        {
        }

        public async Task<Response<bool>> DeleteMutiple(List<string> fileIds)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Image).Name.ToLower()}";
                var url = $"{_url}/multiple";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);

                var json = JsonSerializer.Serialize(fileIds);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var request = new HttpRequestMessage(HttpMethod.Delete, url)
                {
                    Content = content
                };

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.SendAsync(request);
                });

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadFromJsonAsync<Response<bool>>();
                    _uiEventService.ShowAlert(data?.Message!, "success");
                    return data!;
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    _uiEventService.ShowAlert(errorMessage, "error");
                    return null!;
                }
            }
            catch (HttpRequestException ex)
            {
                handleOnExceptionRequest(ex);
                return null!;
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }

        public async Task<Response<List<Image>>> PostMutiple(FileStream[] files, string folder = "images")
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Image).Name.ToLower()}";
                var url = $"{_url}/multiple?folder={folder}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);
                using var form = new MultipartFormDataContent();

                for (int i = 0; i < files.Length; i++)
                {
                    var fileStream = files[i];
                    var streamContent = new StreamContent(fileStream);
                    streamContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                    form.Add(streamContent, "files", $"file_{i}.jpg");
                }

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsync(url, form);
                });

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<Response<List<Image>>>();
                    _uiEventService.ShowAlert(result?.Message!, "success");
                    return result!;
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    _uiEventService.ShowAlert(errorMessage, "error");
                    return null!;
                }

            }
            catch (HttpRequestException ex)
            {
                handleOnExceptionRequest(ex);
                return null!;
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }

        public async Task<Response<Image>> PostSingle(FileStream file, string contentType, string folder = "images")
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Image).Name.ToLower()}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);
                var url = $"{_url}/single?folder={folder}";

                using var form = new MultipartFormDataContent();

                var streamContent = new StreamContent(file);
                streamContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);

                form.Add(streamContent, "file", "uploaded_file.jpg");

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsync(url, form);
                });

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<Response<Image>>();
                    _uiEventService.ShowAlert(result?.Message!, "success");
                    return result!;
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    _uiEventService.ShowAlert(errorMessage, "error");
                    return null!;
                }

            }
            catch (HttpRequestException ex)
            {
                handleOnExceptionRequest(ex);
                return null!;
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }
    }
}
