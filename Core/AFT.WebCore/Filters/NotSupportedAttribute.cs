using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

using AFT.WebCore.Dtos;

namespace AFT.WebCore.Filters
{
    public class NotSupportedAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.OK,
                    new ApiResponse { Code = ResponseCode.NotSupported });
        }
    }
}