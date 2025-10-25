using Microsoft.AspNetCore.Components;
using ReadNest_FE.Interfaces;
using ReadNest_Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace ReadNest_FE.Services.Features
{
    public class VolumnService : RequestHandler<Volumn>, IVolumnService
    {
        public VolumnService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService)
            : base(httpClient, uiEventService, store, navigation, authService)
        {
        }


        public async Task<Response<List<VolumnContent>>> GetVolumnContentByChapterId(string chapterId)
        {
            _uiEventService.SetLoading(true);
            try
            {
                if(string.IsNullOrEmpty(chapterId)) throw new ArgumentNullException(nameof(chapterId));
                _url = $"{_store.Host}/api/{typeof(Volumn).Name.ToLower()}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);

                var url = $"{_url}/VolumnContent?chapterId={chapterId}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(url);
                });

                if (response.IsSuccessStatusCode)
                {
                    var jsonOptions = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    };
                    Response<List<VolumnContent>>? data = await response.Content.ReadFromJsonAsync<Response<List<VolumnContent>>>(jsonOptions);
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
                throw new Exception($"GET request failed: {ex.Message}", ex);
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }
    }
}
