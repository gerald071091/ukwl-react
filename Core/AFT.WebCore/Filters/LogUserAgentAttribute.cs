using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Web.Http;
using System.Web.Http.Controllers;

using Common.Logging;

namespace AFT.WebCore.Filters
{
    [ExcludeFromCodeCoverage]
    public class UserAgentLogAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                var log = LogManager.GetLogger("UserAgent");

                var sb = new StringBuilder();
                sb.AppendFormat("Request to {0} by {1}", actionContext.RequestContext.Url.Request.RequestUri,
                    string.Join(", ", actionContext.Request.Headers.UserAgent));

                log.Info(sb.ToString());
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
            }
        }
    }
}