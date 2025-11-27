using Dapper;
using Mapster;
using Microsoft.EntityFrameworkCore;
using ReadNest_BE.Infrastructure;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Repositories.Shares;
using ReadNest_BE.Services;
using ReadNest_Models;
using static Dapper.SqlMapper;

namespace ReadNest_BE.Repositories
{
    public class ChapterRepository : ExtendRepository<Chapter>, IChapterRepository
    {
        IContentRepository _contentRepository;
        IBookmarkRepository _bookmarkRepository;
        IHttpContextAccessor _httpContextAccessor;
        public ChapterRepository(IHttpContextAccessor httpContextAccessor, IContentRepository contentRepository, AppDbContext appDbContext, JwtService jwtService, IBookmarkRepository bookmarkRepository) : base(appDbContext, jwtService)
        {
            _contentRepository = contentRepository;
            _httpContextAccessor = httpContextAccessor;
            _bookmarkRepository = bookmarkRepository;
        }

        public override async Task<bool> DeleteRange(List<Chapter> entities)
        {
            try
            {
                if (entities.Count == 0)
                    return true;
                foreach (var entity in entities)
                {
                    await _contentRepository.DeleteByChapterId(entity.Id);
                    await _bookmarkRepository.DeleteBookmark(entity.Id);
                    _dbSet.Remove(entity);
                }
                var result = await SaveChange();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> DeleteByVolumnId(string volumnId)
        {
            var items = await _dbSet.Where(c => c.VolumnId!.Equals(volumnId)).ToListAsync();

            if (items.Count == 0)
                return true;
            var result = await DeleteRange(items);
            return result;
        }

        public async Task<List<Chapter>> GetChaptersByVolumnId(string volumnId)
        {
            var result = await _dbSet.Where(c => c.VolumnId!.Equals(volumnId)).ToListAsync();
            return result;
        }

        public async Task<Chapter> GetNewChapterByNovelId(string novelId)
        {
            var volumns = await _context.Volumns.Where(v => v.NovelId!.Equals(novelId)).ToListAsync();

            var chapterList = new List<Chapter>();

            foreach (var vol in volumns)
            {
                var chapterInVolumn = await _context.Chapters.Where(c => c.VolumnId!.Equals(vol.Id)).ToListAsync();
                chapterList.AddRange(chapterInVolumn);
            }

            var novel = chapterList.OrderByDescending(c => c.UpdateDate).FirstOrDefault();
            return novel!;
        }

        public async Task<DetailChapter> GetDetailChapterById(string chapterId)
        {
            var sql = @"
                        WITH ChapterInfo AS (
                            SELECT 
                                c.Id, 
                                c.Name AS ChapterName,
                                c.VolumnId,
                                c.UpdateDate,
                                v.Name AS VolumnName,
                                v.NovelId
                            FROM Chapters c
                            INNER JOIN Volumns v ON c.VolumnId = v.Id
                            WHERE c.Id = @ChapterId
                        ),
                        AllChaptersOrdered AS (
                            SELECT 
                                c.Id,
                                c.Name AS ChapterName,
                                c.VolumnId,
                                c.UpdateDate,
                                v.Name AS VolumnName,
                                v.NovelId,
                                ROW_NUMBER() OVER (ORDER BY v.[Order], c.[Order]) as RowNum
                            FROM Chapters c
                            INNER JOIN Volumns v ON c.VolumnId = v.Id
                            INNER JOIN ChapterInfo ci ON v.NovelId = ci.NovelId
                        ),
                        CurrentChapterRow AS (
                            SELECT RowNum 
                            FROM AllChaptersOrdered 
                            WHERE Id = @ChapterId
                        )
                        SELECT 
                            Id, 
                            ChapterName, 
                            VolumnId, 
                            UpdateDate, 
                            VolumnName, 
                            NovelId,
                            'Current' as ChapterType 
                        FROM ChapterInfo
                        UNION ALL
                        SELECT 
                            prev.Id, 
                            prev.ChapterName, 
                            prev.VolumnId, 
                            prev.UpdateDate, 
                            prev.VolumnName, 
                            prev.NovelId,
                            'Prev' as ChapterType 
                        FROM AllChaptersOrdered prev
                        CROSS JOIN CurrentChapterRow ccr
                        WHERE prev.RowNum = ccr.RowNum - 1
                        UNION ALL
                        SELECT 
                            next.Id, 
                            next.ChapterName, 
                            next.VolumnId, 
                            next.UpdateDate, 
                            next.VolumnName, 
                            next.NovelId,
                            'Next' as ChapterType 
                        FROM AllChaptersOrdered next
                        CROSS JOIN CurrentChapterRow ccr
                        WHERE next.RowNum = ccr.RowNum + 1;

                    SELECT 
                            c.Id, 
                            c.CreateDate, 
                            c.UpdateDate,
                            c.P, 
                            i.Id as ImageId,
                            i.ImagePath AS ImageUrl, 
                            c.[Order], 
                            @ChapterId AS ChapterId,
                            c.CreateBy, 
                            c.UpdateBy
                        FROM Contents c
                        LEFT JOIN Images i ON c.ImageId = i.Id
                        WHERE c.ChapterId = @ChapterId
                        ORDER BY c.[Order];
                ";

            using (var connection = _context.Database.GetDbConnection())
            {
                using (var multi = await connection.QueryMultipleAsync(sql, new { ChapterId = chapterId }))
                {
                    var chapters = (await multi.ReadAsync<ChapterOverview>()).ToList();
                    var contents = (await multi.ReadAsync<Content>()).ToList();

                    var current = chapters.FirstOrDefault(c => c.ChapterType == "Current");
                    if (current == null)
                        throw new Exception("Chapter not found");

                    var detailChapter = new DetailChapter();
                    detailChapter.CurrentChapter = current;
                    detailChapter.PrevChapter = chapters.FirstOrDefault(c => c.ChapterType == "Prev");
                    detailChapter.NextChapter = chapters.FirstOrDefault(c => c.ChapterType == "Next");
                    if (contents.Any())
                    {
                        foreach(var content in contents)
                        {
                            var request = _httpContextAccessor.HttpContext?.Request;
                            string baseUrl = $"{request?.Scheme}://{request?.Host}";
                            content.ImageUrl = $"{baseUrl}{content.ImageUrl}";
                        }
                    }

                    detailChapter.Contents = contents ?? new List<Content>();

                    return detailChapter;
                }
            }
        }

        public async Task UpdateDateChapterById(string chapterId)
        {
            var chapter = await _dbSet.FindAsync(chapterId);
            if (chapter is null)
                throw new Exception("Chapter not found");
            chapter.UpdateDate = DateTime.Now;

            _dbSet.Update(chapter);
            await SaveChange();
        }
    }
}
