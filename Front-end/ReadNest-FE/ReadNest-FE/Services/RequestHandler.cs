using Microsoft.AspNetCore.Components;
using ReadNest_FE.Dictionaries;
using ReadNest_FE.Enums;
using ReadNest_FE.Interfaces;
using ReadNest_FE.Services.Features;
using ReadNest_Models;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReadNest_FE.Services
{
    public class RequestHandler<T> : IRequestHandler<T>
    {
        protected readonly UiEventService _uiEventService;
        protected readonly IAuthService _authService;
        protected readonly NavigationManager _navigation;
        protected readonly HttpClient _httpClient;
        protected string? _url;
        protected readonly Store.Store _store;
        private bool _isRefreshing = false;

        public RequestHandler(HttpClient httpClient, UiEventService uiEventService,  Store.Store store, NavigationManager Navigation, IAuthService authService)
        {
            _httpClient = httpClient;
            _navigation = Navigation;
            bool isInvalid = string.IsNullOrEmpty(store.Host) || string.IsNullOrEmpty(store.Token);
            if (isInvalid)
                Navigation.NavigateTo(RouterManager.GetRouter(Enums.RouterType.LOGIN)!);
            _store = store;
            _authService = authService;
            _uiEventService = uiEventService;   
        }

        public virtual async Task<Response<PaginationData<List<T>>>> GetValue(string? keyword, int page = 1, int pageSize = 5)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(T).Name.ToLower()}";

                var queryParams = new List<string>();
                if (!string.IsNullOrWhiteSpace(keyword))
                {
                    queryParams.Add($"keyword={Uri.EscapeDataString(keyword)}");
                }
                queryParams.Add($"page={page}");
                queryParams.Add($"pageSize={pageSize}");

                var url = _url;
                if (queryParams.Any())
                {
                    url += "?" + string.Join("&", queryParams);
                }

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

                    Response<PaginationData<List<T>>>? data =
                        await response.Content.ReadFromJsonAsync<Response<PaginationData<List<T>>>>(jsonOptions);
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

        public virtual async Task<Response<T>> GetValueById(string id)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(T).Name.ToLower()}";
                var url = $"{_url}/{id}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.GetAsync(url);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<T>? data = await response.Content.ReadFromJsonAsync<Response<T>>();
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

        public virtual async Task<Response<T>> PostValue(T value)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(T).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PostAsJsonAsync(_url, value);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<T>? data = await response.Content.ReadFromJsonAsync<Response<T>>();
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

        public virtual async Task<Response<T>> PutValue(T value)
        {
            _uiEventService.SetLoading(true);
            try
            {
                _url = $"{_store.Host}/api/{typeof(T).Name.ToLower()}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.PutAsJsonAsync(_url, value);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<T>? data = await response.Content.ReadFromJsonAsync<Response<T>>();
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

        public virtual async Task<Response<bool>> DeleteValue(string id)
        {
            _uiEventService.SetLoading(true);
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    throw new ArgumentException("ID cannot be null or empty.", nameof(id));
                }
                _url = $"{_store.Host}/api/{typeof(T).Name.ToLower()}/{id}";

                var response = await SendRequestWithRefreshAsync(async () =>
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", _store.Token);
                    return await _httpClient.DeleteAsync(_url);
                });

                if (response.IsSuccessStatusCode)
                {
                    Response<bool>? data = await response.Content.ReadFromJsonAsync<Response<bool>>();
                    _uiEventService.ShowAlert(data?.Message!, "");
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
                        _uiEventService.ShowAlert("Refresh token Failed", "error");
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