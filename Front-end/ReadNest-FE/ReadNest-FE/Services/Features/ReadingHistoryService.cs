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
    public class ReadingHistoryService : RequestHandler<ReadingHistory>, IReadingHistoryService
    {
        private readonly IJSRuntime _js;
        public ReadingHistoryService(IJSRuntime js, HttpClient httpClient, UiEventService uiEventService, Store.Store store, NavigationManager Navigation, IAuthService authService) : base(httpClient, uiEventService, store, Navigation, authService)
        {
            _js = js;
        }

        public async Task<Response<List<ReadingHistoryDto>>> Get()
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(ReadingHistory).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(_url);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<List<ReadingHistoryDto>>? data = await response.Content.ReadFromJsonAsync<Response<List<ReadingHistoryDto>>>();
                    if (data?.Data != null)
                    {
                        _store.readingHistories = data.Data;
                        await _js.InvokeVoidAsync("localStorage.setItem", "readingHistories",
                            JsonSerializer.Serialize(data.Data));
                    }
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

        public async Task<Response<ReadingHistory>> Post(ReadingHistory readingHistory)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(ReadingHistory).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsJsonAsync(_url, readingHistory);
                });

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadFromJsonAsync<Response<ReadingHistory>>();
                    return data!;
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    _uiEventService.ShowAlert(errorMessage, "error");
                    return new Response<ReadingHistory>(null!, errorMessage, false);
                }
            }
            catch (HttpRequestException ex)
            {
                handleOnExceptionRequest(ex);
                return new Response<ReadingHistory>(null!, ex.Message, false);
            }
            finally
            {
                _uiEventService.SetLoading(false);
            }
        }
    }
}
