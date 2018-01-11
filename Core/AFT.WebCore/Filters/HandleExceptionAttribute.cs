using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

using AFT.RegoApi.Proxy.Exceptions;
using AFT.WebCore.Dtos;

using Common.Logging;

namespace AFT.WebCore.Filters
{
    public class HandleExceptionAttribute : ExceptionFilterAttribute
    {
        protected ILog Log = LogManager.GetLogger("WhitelabelApi");

        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception == null)
            {
                return;
            }

            Log.Error(
                string.Format("Failed to execute {0} -> {1}.",
                    context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName,
                    context.ActionContext.ActionDescriptor.ActionName), context.Exception);

            if (context.Exception is SessionExpiredException)
            {
                context.Response = context.Request.CreateResponse(HttpStatusCode.OK,
                    new ApiResponse { Code = ResponseCode.SessionExpired });
            }
            else if (context.Exception is DeactivatedAccountException)
            {
                context.Response = context.Request.CreateResponse(HttpStatusCode.OK,
                    new ApiResponse { Code = ResponseCode.DeactivatedAccount, ErrorMessage = context.Exception.Message });
            }
            else if (context.Exception is ApiProxyBrokenException)
            {
                context.Response = context.Request.CreateResponse(HttpStatusCode.OK,
                    new ApiResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = context.Exception.Message });
            }
            else
            {
                context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError,
                    new ApiResponse { Code = ResponseCode.UnexpectedError });
            }

            base.OnException(context);
        }
    }
}