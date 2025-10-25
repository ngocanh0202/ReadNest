namespace ReadNest_Models
{
    public class PaginationData<T>
    {
        public T Rows { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public PaginationData(T rows, int pageNumber, int pageSize, int totalRecords)
        {
            Rows = rows;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalRecords = totalRecords;
            TotalPages = (int)Math.Ceiling((double)totalRecords / pageSize);
        }
    }
}
