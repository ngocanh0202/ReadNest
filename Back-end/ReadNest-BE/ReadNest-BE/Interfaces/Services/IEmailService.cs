using System.Threading.Tasks;

namespace ReadNest_BE.Interfaces.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml = true);
        Task<bool> SendSystemMailAsync(string subject, string body, bool isHtml = true);
    }
}
