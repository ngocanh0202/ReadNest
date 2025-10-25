using ReadNest_FE.Enums;

namespace ReadNest_FE.Dictionaries
{
    public class RouterManager
    {
        public static Dictionary<RouterType, string> routers = new Dictionary<RouterType, string>()
        {
            { RouterType.HOME, "/" },
            { RouterType.LOGIN, "/login" },
            { RouterType.REGISTER, "/register" },
            { RouterType.PROFILE, "/profile" },
            { RouterType.IMAGES, "/images" },
            { RouterType.FILTER, "/filter" },
            { RouterType.CHAPTER, "/chapter/{id}" },
            { RouterType.NOVEL, "/novel/{id}" },
            { RouterType.POSTNOVEL, "/action/post-novel" },
            { RouterType.PUTNOVEL, "/action/put-novel/{id}" },
            { RouterType.POSTCHAPTER, "/action/post-chapter/{id}" },
            { RouterType.UPDATECHAPTER, "/action/update-chapter/{id}" },
            { RouterType.NONE, "#" }
        };

        public static string? GetRouter(RouterType type)
        {
            return routers[type] ?? null;
        }

    }
}
