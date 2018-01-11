using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

using AFT.WebCore.Dtos;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Filters
{
    public class ValidateProductAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            string product = actionContext.RequestContext.RouteData.Values["product"] as string;

            if (string.IsNullOrWhiteSpace(product) || ProductMapping.Mappings.Keys.All(key => key != product))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.OK,
                    new ApiResponse { Code = ResponseCode.ProductNotFound });
            }

            base.OnActionExecuting(actionContext);
        }
    }
}