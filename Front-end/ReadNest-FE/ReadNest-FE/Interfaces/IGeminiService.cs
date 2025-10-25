using ReadNest_Models;

namespace ReadNest_FE.Interfaces
{
    public interface IGeminiService
    {
        Task<Response<TranslationResponse>> translator(TranslationRequest novelTranslator);
    }
}
