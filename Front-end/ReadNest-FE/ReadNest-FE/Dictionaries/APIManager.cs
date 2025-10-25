using ReadNest_FE.Enums;

namespace ReadNest_FE.EndPoints
{
    public static class APIManager
    {
        public static Dictionary<APIType, string> endPoints = new Dictionary<APIType, string>()
        {
            { APIType.POST_LOGIN, "https://{host}/api/auth/login" },
            { APIType.POST_REGISTER, "https://{host}/api/auth/register" },
            { APIType.DELETE_AUTH, "https://{host}/api/auth/delete" },
            { APIType.CHAPTER, "https://{host}/api/chapter" },
            { APIType.POST_CONTENT_MUTIPLE, "https://{host}/api/content/multiple" },
            { APIType.CONTENT, "https://{host}/api/content" },
            { APIType.GEMINI_TRANSLATOR, "https://{host}/api/gemini/translate" },
            { APIType.IMAGE, "https://{host}/api/image" },
            { APIType.POST_IMAGE_SINGLE, "https://{host}/api/image/single" },
            { APIType.POST_IMAGE_MUTIPLE, "https://{host}/api/image/multiple" },
            { APIType.NOVEL, "https://{host}/api/novel" },
            { APIType.NOVELPROMPT, "https://{host}/api/novelprompt" },
            { APIType.PROMPT, "https://{host}/api/prompt" },
        };

        public static string? GetEndPoint(APIType type)
        {
            return endPoints[type];
        }
    }
}
