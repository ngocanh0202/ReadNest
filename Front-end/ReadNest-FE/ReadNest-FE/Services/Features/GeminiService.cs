using ReadNest_FE.Interfaces;
using ReadNest_FE.Store;
using ReadNest_Models;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace ReadNest_FE.Services.Features
{
    public class GeminiService : IGeminiService
    {
        protected readonly UiEventService _uiEventService;
        protected readonly IAuthService _authService;
        protected readonly HttpClient _httpClient;
        protected string? _url;
        protected Store.Store _store;
        private bool _isRefreshing = false;
        public GeminiService(HttpClient httpClient, UiEventService uiEventService, Store.Store store, IAuthService authService)
        {
            _httpClient = httpClient;
            if (store == null)
                throw new ArgumentNullException(nameof(store), "Store cannot be null");
            if (string.IsNullOrEmpty(store.Host))
                throw new ArgumentException("Store host cannot be null or empty", nameof(store.Host));
            _store = store;
            _authService = authService;
            _uiEventService = uiEventService;
        }
        public async Task<Response<TranslationResponse>> translator(TranslationRequest value)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/Gemini";
                var url = $"{_url}/translator";
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _store.Token);

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsJsonAsync(url, value);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<TranslationResponse>? data = await response.Content.ReadFromJsonAsync<Response<TranslationResponse>>();
                    _uiEventService?.ShowAlert(data?.Message!,"success");
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

        public async Task<HttpResponseMessage> SendRequestWithRefreshAsync(Func<Task<HttpResponseMessage>> requestFunc)
        {
            var response = await requestFunc();

            if (response.StatusCode == HttpStatusCode.Unauthorized && !_isRefreshing)
            {
                _isRefreshing = true;
                try
                {
                    var refreshResult = await _authService.RefreshTokenAsync();
                    if (refreshResult.Success)
                    {
                        response = await requestFunc();
                    }
                    else
                    {
                        await _authService.Logout();
                    }
                }
                finally
                {
                    _isRefreshing = false;
                }
            }
            else if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                await _authService.Logout();
            }

            return response;
        }

        protected void handleOnExceptionRequest(HttpRequestException ex)
        {
            _uiEventService.ShowAlert(ex.Message, "error");
        }
    }
}
