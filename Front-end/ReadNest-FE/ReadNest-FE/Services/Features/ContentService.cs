
using Microsoft.AspNetCore.Components;
using ReadNest_FE.Interfaces;
using ReadNest_Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace ReadNest_FE.Services.Features
{
    public class ContentService : RequestHandler<Content>, IContentService
    {
        public ContentService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService) 
            : base(httpClient, uiEventService, store, navigation, authService)
        {

        }

        public async Task<Response<List<Content>>> GetMutipleByChapterId(string chapterId)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Content).Name.ToLower()}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);
                var url = $"{_url}/mutiple/{chapterId}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(url);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<List<Content>>? data = await response.Content.ReadFromJsonAsync<Response<List<Content>>>();
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
    }
}
