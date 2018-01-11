using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Controllers;

using AFT.WebCore.Utils;

using Common.Logging;

namespace AFT.WebCore.Filters
{
    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class AntiForgeryTokenAttribute : AuthorizeAttribute
    {
        private string GetRequestLog(string description, HttpActionContext actionContext)
        {
            try
            {
                var sb = new StringBuilder();
                sb.AppendLine(description);
                sb.AppendLine(string.Format("User Agent: {0}",
                    string.Join(", ", actionContext.Request.Headers.UserAgent)));
                sb.AppendLine(string.Format("IP Address: {0}",
                    ((NetworkUtility)
                        GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(NetworkUtility)))
                        .GetClientIPAddress()));
                return sb.ToString();
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
                return string.Empty;
            }
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.ActionDescriptor.GetCustomAttributes<SuppressCsrfProtectionAttribute>().Any())
            {
                return;
            }

            var log = LogManager.GetLogger("CSRF");

            // IE 8 shit, names are lower-cased
            if (!actionContext.Request.Headers.Any(x => x.Key.Equals(Constants.CsrfTokenName, StringComparison.OrdinalIgnoreCase)))
            {
                log.Warn(GetRequestLog("CSRF token header not found.", actionContext));
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.NotFound);
                return;
            }

            var tokenHeaders =
                actionContext.Request.Headers.Where(x => x.Key.Equals(Constants.CsrfTokenName, StringComparison.OrdinalIgnoreCase))
                    .Select(x => x.Value)
                    .SelectMany(x => x)
                    .FirstOrDefault();

            if (string.IsNullOrWhiteSpace(tokenHeaders) || !tokenHeaders.Contains(":"))
            {
                log.Warn(GetRequestLog("CSRF token value not found.", actionContext));
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.NotFound);
                return;
            }

            var tokens = tokenHeaders.Split(':');

            if (tokens.Length != 2)
            {
                log.Warn(GetRequestLog("CSRF token value not valid.", actionContext));
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.NotFound);
                return;
            }

            string cookieToken = tokens[0].Trim();
            string formToken = tokens[1].Trim();

            try
            {
                AntiForgery.Validate(cookieToken, formToken);
            }
            catch
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}