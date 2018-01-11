using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

using AFT.WebCore.Dtos;

namespace AFT.WebCore.Filters
{
    public class ValidateAuthenticityAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (!actionContext.RequestContext.Principal.Identity.IsAuthenticated)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                    new ApiResponse { Code = ResponseCode.UnauthenticatedUser });
            }

            base.OnAuthorization(actionContext);
        }
    }
}