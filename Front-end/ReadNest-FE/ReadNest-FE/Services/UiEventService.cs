namespace ReadNest_FE.Services
{
    public class UiEventService
    {
        public event Action<string, string>? OnShowAlert;
        public event Action<string>? OnSelectNovelId;
        public event Action<bool>? OnSetLoading;
        public Action<string>? OnSetContent { get; set; }
        public void ShowAlert(string message, string type)
        {
            OnShowAlert?.Invoke(message, type);
        }
        public void SetLoading(bool isLoading)
        {
            OnSetLoading?.Invoke(isLoading);
        }
        public void SetSelectNovelId(string noveId)
        {
            OnSelectNovelId?.Invoke(noveId);
        }

    }
}
