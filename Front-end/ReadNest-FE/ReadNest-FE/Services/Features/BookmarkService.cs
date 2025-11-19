using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using ReadNest_FE.Dictionaries;
using ReadNest_FE.Enums;
using ReadNest_FE.Interfaces;
using ReadNest_FE.Services.Features;
using ReadNest_FE.Store;
using ReadNest_Models;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace ReadNest_FE.Services.Features
{
    public class BookmarkService : RequestHandler<Bookmark>, IBookmarkService
    {
        private readonly IJSRuntime _js;
        public BookmarkService(IJSRuntime js, HttpClient httpClient, UiEventService uiEventService, Store.Store store, NavigationManager Navigation, IAuthService authService) : base(httpClient, uiEventService, store, Navigation, authService)
        {
            _js = js;
        }

        public async Task<Response<List<BookmarkNovel>>> Get()
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Bookmark).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(_url);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<List<BookmarkNovel>>? data = await response.Content.ReadFromJsonAsync<Response<List<BookmarkNovel>>>();
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

        public async Task<Response<Bookmark>> Post(Bookmark readingHistory)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(Bookmark).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsJsonAsync(_url, readingHistory);
                });

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadFromJsonAsync<Response<Bookmark>>();
                    return data!;
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    _uiEventService.ShowAlert(errorMessage, "error");
                    return new Response<Bookmark>(null!, errorMessage, false);
                }
            }
            catch (HttpRequestException ex)
            {
                handleOnExceptionRequest(ex);
                return new Response<Bookmark>(null!, ex.Message, false);
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }
    }
}
