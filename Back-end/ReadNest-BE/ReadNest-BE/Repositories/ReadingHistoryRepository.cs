using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;
using static Dapper.SqlMapper;

namespace ReadNest_BE.Repositories
{
    public class ReadingHistoryRepository : ExtendRepository<ReadingHistory>, IReadingHistoryRepository
    {
        IHttpContextAccessor _httpContextAccessor;
        public ReadingHistoryRepository(IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext, JwtService jwtService)
            : base(appDbContext, jwtService)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<ReadingHistoryDto>> GetReadingHistoriesByUserId(string userId)
        {
            var sql = @"
                    SELECT
                        rh.Id AS Id,
                        n.Id AS NovelId,
                        n.Name AS NameNovel,
                        v.Id AS VolumnId,
                        v.Name AS NameVolumn,
                        c.Id AS ChapterId,
                        c.Name AS NameChapter,
                        i.ImagePath AS ImageUrl,
                        rh.UpdateDate
                    FROM ReadingHistorys rh
                    LEFT JOIN Novels n ON n.Id = rh.NovelId
                    LEFT JOIN Volumns v ON v.Id = rh.VolumnId
                    LEFT JOIN Chapters c ON c.Id = rh.ChapterId
                    LEFT JOIN Images i ON i.Id = n.ImageId
                    WHERE rh.CreateBy = {0}
                    ORDER BY rh.UpdateDate DESC";

            var histories = await _context.Database
                .SqlQueryRaw<ReadingHistoryDto>(sql, userId)
                .ToListAsync();
            var request = _httpContextAccessor.HttpContext?.Request;
            string baseUrl = $"{request?.Scheme}://{request?.Host}";
            foreach (var hist in histories)
            {
                hist.ImageUrl = $"{baseUrl}{hist.ImageUrl}";
            }

            return histories;
        }

        public async Task<ReadingHistory> UpsertReadingHistory(string userId, ReadingHistory readingHistory)
        {
            try
            {
                var existingRecord = await _dbSet
                    .FirstOrDefaultAsync(r => r.NovelId == readingHistory.NovelId && r.CreateBy == userId);

                if (existingRecord != null)
                {
                    existingRecord.NovelId = readingHistory.NovelId;
                    existingRecord.VolumnId = readingHistory.VolumnId;
                    existingRecord.ChapterId = readingHistory.ChapterId;
                    existingRecord.UpdateDate = DateTime.UtcNow;

                    _dbSet.Update(existingRecord);
                }
                else
                {
                    var userHistories = await GetReadingHistoriesByUserId(userId);
                    if (userHistories.Count >= 50)
                    {
                        var oldest = userHistories.Last();
                        var hr = await _dbSet.FindAsync(oldest.Id);
                        _dbSet.Remove(hr!);
                    }

                    readingHistory.CreateBy = userId;
                    readingHistory.CreateDate = DateTime.UtcNow;
                    readingHistory.UpdateDate = DateTime.UtcNow;
                    await _dbSet.AddAsync(readingHistory);
                    existingRecord = readingHistory;
                }

                await _context.SaveChangesAsync();
                return existingRecord;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error upserting reading history: {ex.Message}", ex);
            }
        }
    }
}