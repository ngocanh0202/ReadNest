namespace ReadNest_Models
{
    public class Response<T>
    {
        public T? Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
        public Response(T? data, string message, bool success)
        {
            Data = data;
            Message = message;
            Success = success;
        }
    }
}
