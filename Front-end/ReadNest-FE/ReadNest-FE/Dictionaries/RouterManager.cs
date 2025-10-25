using ReadNest_FE.Enums;

namespace ReadNest_FE.Dictionaries
{
    public class RouterManager
    {
        public static Dictionary<RouterType, string> routers = new Dictionary<RouterType, string>()
        {
            { RouterType.HOME, "/ReadNest/" },
            { RouterType.LOGIN, "/ReadNest/login" },
            { RouterType.REGISTER, "/ReadNest/register" },
            { RouterType.PROFILE, "/ReadNest/profile" },
            { RouterType.IMAGES, "/ReadNest/images" },
            { RouterType.FILTER, "/ReadNest/filter" },
            { RouterType.CHAPTER, "/ReadNest/chapter/{id}" },
            { RouterType.NOVEL, "/ReadNest/novel/{id}" },
            { RouterType.POSTNOVEL, "/ReadNest/action/post-novel" },
            { RouterType.PUTNOVEL, "/ReadNest/action/put-novel/{id}" },
            { RouterType.POSTCHAPTER, "/ReadNest/action/post-chapter/{id}" },
            { RouterType.UPDATECHAPTER, "/ReadNest/action/update-chapter/{id}" },
            { RouterType.NONE, "#" }
        };

        public static string? GetRouter(RouterType type)
        {
            return routers[type] ?? null;
        }

    }
}
