using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using Common.Logging;

namespace AFT.WebCore.Handlers
{
    [ExcludeFromCodeCoverage]
    public class LogRequestAndResponseHandler : MessageProcessingHandler
    {
        protected override HttpRequestMessage ProcessRequest(HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            var log = LogManager.GetLogger("WhitelabelApiRequest");

            var sb = new StringBuilder();

            sb.AppendLine(string.Join("\n",
                request.Headers.Select(x => string.Format("{0}: {1}", x.Key, string.Join(",", x.Value)))));

            sb.AppendFormat("Request({0}) to {1} as below.\n{2}", request.Method, request.RequestUri,
                request.Content == null ? string.Empty : request.Content.ReadAsStringAsync().Result);

            log.Info(sb.ToString());

            return request;
        }

        protected override HttpResponseMessage ProcessResponse(HttpResponseMessage response,
            CancellationToken cancellationToken)
        {
            var log = LogManager.GetLogger("WhitelabelApiResponse");

            var sb = new StringBuilder();

            sb.AppendLine(string.Join("\n",
                response.Headers.Select(x => string.Format("{0}: {1}", x.Key, string.Join(",", x.Value)))));

            sb.AppendFormat("{0}. Response from {1} as below.\n{2}", response.ReasonPhrase, response.RequestMessage.RequestUri,
                response.Content == null ? string.Empty : response.Content.ReadAsStringAsync().Result);

            log.Info(sb.ToString());

            return response;
        }
    }
}