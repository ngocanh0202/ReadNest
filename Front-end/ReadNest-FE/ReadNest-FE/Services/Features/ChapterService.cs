using Microsoft.AspNetCore.Components;
using ReadNest_FE.Interfaces;
using ReadNest_Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace ReadNest_FE.Services.Features
{
    public class ChapterService : RequestHandler<Chapter>, IChapterService
    {
        public ChapterService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService) : 
                base(httpClient, uiEventService, store, navigation, authService)
        {
        }

        public async Task<Response<DetailChapter>> GetDetailChapterById(string chapterId)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Chapter).Name.ToLower()}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);
                var url = $"{_url}/detail/{chapterId}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(url);
                });
                if (response.IsSuccessStatusCode)
                {
                    Response<DetailChapter>? data = await response.Content.ReadFromJsonAsync<Response<DetailChapter>>();
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

        public async Task<Response<List<Content>>> PostMutiple(List<Content> contents, string chapterId)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Chapter).Name.ToLower()}";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);
                var url = $"{_url}/mutiple/chapter/{chapterId}/contents";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsJsonAsync(url, contents);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<List<Content>>? data = await response.Content.ReadFromJsonAsync<Response<List<Content>>>();
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
    }
}
