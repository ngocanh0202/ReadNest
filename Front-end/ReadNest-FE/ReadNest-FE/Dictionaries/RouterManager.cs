using ReadNest_FE.Enums;

namespace ReadNest_FE.Dictionaries
{
    public static class RouterManager
    {
        private static readonly bool IsDevelopment =
            #if DEBUG
                true;
            #else
                false;
            #endif

        private static string Base => IsDevelopment ? "/" : "/ReadNest/";

        public static readonly Dictionary<RouterType, string> routers = new()
        {
            { RouterType.HOME, $"{Base}" },
            { RouterType.LOGIN, $"{Base}login" },
            { RouterType.REGISTER, $"{Base}register" },
            { RouterType.PROFILE, $"{Base}profile" },
            { RouterType.IMAGES, $"{Base}images" },
            { RouterType.FILTER, $"{Base}filter" },
            { RouterType.FILTERBYCATEGORY, $"{Base}filter?CategoryName={{name}}" },
            { RouterType.HISTORY, $"{Base}History" },
            { RouterType.CHAPTER, $"{Base}chapter/{{id}}" },
            { RouterType.NOVEL, $"{Base}novel/{{id}}" },
            { RouterType.POSTNOVEL, $"{Base}action/post-novel" },
            { RouterType.PUTNOVEL, $"{Base}action/put-novel/{{id}}" },
            { RouterType.POSTCHAPTER, $"{Base}action/post-chapter/{{id}}" },
            { RouterType.UPDATECHAPTER, $"{Base}action/update-chapter/{{id}}" },
            { RouterType.NONE, "#" }
        };

        public static string? GetRouter(RouterType type) => routers[type];
    }
}
