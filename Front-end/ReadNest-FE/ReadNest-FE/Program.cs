using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
using ReadNest_FE;
using ReadNest_FE.Interfaces;
using ReadNest_FE.Router;
using ReadNest_FE.Services;
using ReadNest_FE.Services.Features;
using ReadNest_FE.Store;
using ReadNest_Models;
using System.Text.Json;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<UiEventService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IChapterService, ChapterService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IContentService, ContentService>();
builder.Services.AddScoped<IGeminiService, GeminiService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<INovelService, NovelService>();
builder.Services.AddScoped<IPromptService, PromptService>();
builder.Services.AddScoped<IVolumnService, VolumnService>();
builder.Services.AddScoped<IReadingHistoryService, ReadingHistoryService>();
builder.Services.AddSingleton<Router>();
builder.Services.AddSingleton<Store>();

var host = builder.Build();

var js = host.Services.GetRequiredService<IJSRuntime>();
var store = host.Services.GetRequiredService<Store>();

var savedToken = await js.InvokeAsync<string>("localStorage.getItem", "authToken");
var savedHost = await js.InvokeAsync<string>("localStorage.getItem", "host");
var savedUserName = await js.InvokeAsync<string>("localStorage.getItem", "userName");
var savedHasContributePermissionString = await js.InvokeAsync<string>("localStorage.getItem", "HasContributePermission");
var savedReadingHistory = await js.InvokeAsync<string>("localStorage.getItem", "readingHistories");


if (!string.IsNullOrEmpty(savedToken))
{
    store.Token = savedToken;
}
if (!string.IsNullOrEmpty(savedUserName))
{
    store.UserName = savedUserName;
}
if (!string.IsNullOrEmpty(savedHost))
{
    store.Host = savedHost;
}
if (!string.IsNullOrEmpty(savedHasContributePermissionString))
{
    store.HasContributePermission = bool.Parse(savedHasContributePermissionString);
}
if (!string.IsNullOrEmpty(savedReadingHistory))
{
    try
    {
        store.readingHistories = JsonSerializer.Deserialize<List<ReadingHistoryDto>>(savedReadingHistory);
    }
    catch
    {
        store.readingHistories = null;
    }
}

store.IsModeReader = true;

await host.RunAsync();