using ReadNest_FE.Dictionaries;
using ReadNest_FE.Enums;

namespace ReadNest_FE.Router
{
    public class Router
    {
        private readonly Store.Store _store;

        public readonly string HomeUrl = RouterManager.GetRouter(RouterType.HOME)!;
        public readonly string LoginUrl = RouterManager.GetRouter(RouterType.LOGIN)!;
        public readonly string RegisterUrl = RouterManager.GetRouter(RouterType.REGISTER)!;
        public readonly string ProfileUrl = RouterManager.GetRouter(RouterType.PROFILE)!;
        public readonly string ImagesUrl = RouterManager.GetRouter(RouterType.IMAGES)!;
        public readonly string PostNovelUrl = RouterManager.GetRouter(RouterType.POSTNOVEL)!;
        public readonly string PostChapterUrl = RouterManager.GetRouter(RouterType.POSTCHAPTER)!;
        public readonly string FilterUrl = RouterManager.GetRouter(RouterType.FILTER)!;
        public readonly string None = RouterManager.GetRouter(RouterType.NONE)!;

        public string NovelUrl => _store.IsModeAction
            ? RouterManager.GetRouter(RouterType.PUTNOVEL)!
            : RouterManager.GetRouter(RouterType.NOVEL)!;

        public string ChapterUrl => _store.IsModeAction
            ? RouterManager.GetRouter(RouterType.UPDATECHAPTER)!
            : RouterManager.GetRouter(RouterType.CHAPTER)!;

        public Router(Store.Store store)
        {
            _store = store;
        }
    }
}