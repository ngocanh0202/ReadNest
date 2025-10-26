using ReadNest_Models;

namespace ReadNest_BE.Interfaces.Repositories
{
    public interface IReadingHistoryRepository : IRepository<ReadingHistory>
    {
        Task<List<ReadingHistoryDto>> GetReadingHistoriesByUserId(string userId);
        Task<ReadingHistory> UpsertReadingHistory(string userId, ReadingHistory readingHistory);
    }
}
