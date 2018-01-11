using System.Diagnostics.CodeAnalysis;
using RestSharp;

namespace AFT.WebCore
{
    [ExcludeFromCodeCoverage]
    public class CustomRestClient : RestClient
    {
        public CustomRestClient(string baseUrl)
            : base(baseUrl)
        {
            AddHandler("application/json", new JsonDotNetDeserializer());
        }
    }
}