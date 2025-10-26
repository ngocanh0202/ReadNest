using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IReadingHistoryService : IRequestHandler<ReadingHistory>
    {
        Task<Response<List<ReadingHistoryDto>>> Get();
        Task<Response<ReadingHistory>> Post(ReadingHistory readingHistory);
    }
}
