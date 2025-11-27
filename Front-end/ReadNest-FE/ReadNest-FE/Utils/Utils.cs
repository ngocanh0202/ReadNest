using ReadNest_Enums;
using ReadNest_Models;
using System.Text;
using System.Text.RegularExpressions;

namespace ReadNest_FE.Utils
{
    public class Utils
    {
        public static List<Content> ParseEditorContentToList(string htmlContent, string chapterId)
        {
            if (string.IsNullOrWhiteSpace(htmlContent))
                return new List<Content>();

            var contentList = new List<Content>();
            var pRegex = new Regex(@"<p[^>]*>(.*?)</p>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
            var matches = pRegex.Matches(htmlContent);
            int order = 0;

            foreach (Match match in matches)
            {
                var pContent = match.Groups[1].Value.Trim();

                var imgRegex = new Regex(@"<img[^>]*>", RegexOptions.IgnoreCase);
                var imgMatches = imgRegex.Matches(pContent);

                if (imgMatches.Count == 0)
                {
                    var textOnly = Regex.Replace(pContent, @"<[^>]+>", "").Trim();
                    textOnly = Regex.Replace(textOnly, @"&nbsp;", " ").Trim();

                    if (string.IsNullOrWhiteSpace(textOnly))
                        continue;

                    var cleanedContent = Regex.Replace(pContent, @"<br\s*/?>", "", RegexOptions.IgnoreCase);
                    cleanedContent = Regex.Replace(cleanedContent, @"&nbsp;", " ").Trim();

                    if (!string.IsNullOrWhiteSpace(cleanedContent))
                    {
                        contentList.Add(new Content
                        {
                            Order = order++,
                            P = cleanedContent,
                            ChapterId = chapterId
                        });
                    }
                }
                else
                {
                    var parts = new List<string>();
                    int lastIndex = 0;

                    foreach (Match imgMatch in imgMatches)
                    {
                        var textBefore = pContent.Substring(lastIndex, imgMatch.Index - lastIndex).Trim();
                        if (!string.IsNullOrWhiteSpace(textBefore))
                        {
                            var cleanedText = Regex.Replace(textBefore, @"<br\s*/?>", "", RegexOptions.IgnoreCase);
                            cleanedText = Regex.Replace(cleanedText, @"&nbsp;", " ").Trim();

                            var textOnly = Regex.Replace(cleanedText, @"<[^>]+>", "").Trim();

                            if (!string.IsNullOrWhiteSpace(textOnly))
                            {
                                parts.Add(cleanedText);
                            }
                        }

                        parts.Add(imgMatch.Value);

                        lastIndex = imgMatch.Index + imgMatch.Length;
                    }

                    if (lastIndex < pContent.Length)
                    {
                        var textAfter = pContent.Substring(lastIndex).Trim();
                        if (!string.IsNullOrWhiteSpace(textAfter))
                        {
                            var cleanedText = Regex.Replace(textAfter, @"<br\s*/?>", "", RegexOptions.IgnoreCase);
                            cleanedText = Regex.Replace(cleanedText, @"&nbsp;", " ").Trim();

                            var textOnly = Regex.Replace(cleanedText, @"<[^>]+>", "").Trim();

                            if (!string.IsNullOrWhiteSpace(textOnly))
                            {
                                parts.Add(cleanedText);
                            }
                        }
                    }

                    foreach (var part in parts)
                    {
                        var content = new Content
                        {
                            Order = order++,
                            ChapterId = chapterId
                        };

                        var isImg = part.Trim().StartsWith("<img", StringComparison.OrdinalIgnoreCase);

                        if (isImg)
                        {
                            var srcMatch = Regex.Match(part, @"src=[""']([^""']+)[""']", RegexOptions.IgnoreCase);
                            if (srcMatch.Success)
                                content.ImageUrl = srcMatch.Groups[1].Value;

                            var altMatch = Regex.Match(part, @"alt=[""']([^""']*)[""']", RegexOptions.IgnoreCase);
                            if (altMatch.Success)
                                content.ImageId = altMatch.Groups[1].Value;
                        }
                        else
                        {
                            content.P = part;
                        }

                        contentList.Add(content);
                    }
                }
            }

            return contentList;
        }

        public static string ConvertContentListToHtml(List<Content> contentList)
        {
            if (contentList == null || !contentList.Any())
                return "";

            var htmlBuilder = new StringBuilder();

            var orderedContent = contentList.ToList();

            foreach (var content in orderedContent)
            {
                if (!string.IsNullOrWhiteSpace(content.ImageId))
                {
                    var altAttribute = !string.IsNullOrWhiteSpace(content.ImageId)
                        ? $" alt=\"{content.ImageId}\""
                        : "";

                    htmlBuilder.Append($"<p><img src=\"{content.ImageUrl}\"{altAttribute}></p>");
                }
                else if (!string.IsNullOrWhiteSpace(content.P))
                {
                    if (content.P.TrimStart().StartsWith("<p>", StringComparison.OrdinalIgnoreCase))
                    {
                        htmlBuilder.Append(content.P);
                    }
                    else
                    {
                        htmlBuilder.Append($"<p>{content.P}</p>");
                    }
                }
                htmlBuilder.Append($"<p><br></p>");
            }

            return htmlBuilder.ToString();
        }
        public static string GetTimeAgo(DateTime date)
        {
            var now = DateTime.UtcNow;
            var timeSpan = now - date.ToUniversalTime();

            if (timeSpan.TotalSeconds < 60)
                return "Just now";

            if (timeSpan.TotalMinutes < 60)
                return $"{(int)timeSpan.TotalMinutes} minute{(timeSpan.TotalMinutes >= 2 ? "s" : "")} ago";

            if (timeSpan.TotalHours < 24)
                return $"{(int)timeSpan.TotalHours} hour{(timeSpan.TotalHours >= 2 ? "s" : "")} ago";

            if (timeSpan.TotalDays < 30)
                return $"{(int)timeSpan.TotalDays} day{(timeSpan.TotalDays >= 2 ? "s" : "")} ago";

            if (timeSpan.TotalDays < 365)
            {
                int months = (int)(timeSpan.TotalDays / 30);
                return $"{months} month{(months >= 2 ? "s" : "")} ago";
            }

            int years = (int)(timeSpan.TotalDays / 365);
            return $"{years} year{(years >= 2 ? "s" : "")} ago";
        }
        public static string GetLengthWords(List<Content> contents)
        {
            if (contents == null || contents.Count == 0)
                return "0";

            int totalWords = 0;

            foreach (var content in contents)
            {
                if (!string.IsNullOrWhiteSpace(content.P))
                {
                    var words = content.P.Split(
                        new char[] { ' ', '\t', '\r', '\n' },
                        StringSplitOptions.RemoveEmptyEntries
                    );
                    totalWords += words.Length;
                }
            }

            return totalWords.ToString("N0");
        }

        public static string FormatDateTime(DateTime dateTime)
        {
            return dateTime.ToString("dd MMM yyyy");
        }

        public static string FormatNovelStatus(NovelStatus novelStatus)
        {
            return novelStatus switch
            {
                NovelStatus.COMPLETED => "Completed",
                NovelStatus.STOPPED => "Stoped",
                NovelStatus.INPROGRESS => "In progress",
                _ => "Undefine"
            };
        }


        public static bool IsWithinLast7Days(DateTime dateTime)
        {
            var now = DateTime.UtcNow;
            return dateTime >= now.AddDays(-7) && dateTime <= now;
        }

    }
}
