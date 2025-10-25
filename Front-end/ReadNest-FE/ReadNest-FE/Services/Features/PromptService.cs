using ReadNest_FE.EndPoints;
using ReadNest_FE.Interfaces;
using ReadNest_Models;
using Microsoft.AspNetCore.Components;

namespace ReadNest_FE.Services.Features
{
    public class PromptService : RequestHandler<Prompt>, IPromptService
    {
        public PromptService(HttpClient httpClient, Store.Store store, NavigationManager navigation, IAuthService authService, UiEventService uiEventService) : 
                base(httpClient, uiEventService, store, navigation, authService)
        {
        }
    }
}
