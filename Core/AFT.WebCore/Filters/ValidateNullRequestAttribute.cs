using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

using AFT.WebCore.Dtos;

namespace AFT.WebCore.Filters
{
    public class ValidateNullRequestAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ActionArguments.FirstOrDefault().Value == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest,
                    new ApiResponse { Code = ResponseCode.InvalidRequest });
            }

            base.OnActionExecuting(actionContext);
        }
    }
}