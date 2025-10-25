namespace ReadNest_FE.Components.Alert
{
    public class AlertMessageItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = "info";
    }
}
