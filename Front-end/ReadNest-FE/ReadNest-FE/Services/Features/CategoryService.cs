using Microsoft.AspNetCore.Components;
using ReadNest_FE.Interfaces;
using ReadNest_Models;

namespace ReadNest_FE.Services.Features
{
    public class CategoryService : RequestHandler<Category>, ICategoryService
    {
        public CategoryService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService) : 
                base(httpClient, uiEventService, store, navigation, authService)
        {
        }
    }
}
