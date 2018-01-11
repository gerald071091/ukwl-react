using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.SessionState;

using AFT.WebCore.Utils;
using AFT.WebCore.Helper;
using System.Configuration;

namespace AFT.WebCore.Handlers
{
    [ExcludeFromCodeCoverage]
    public class SbtechJsHandler : IHttpHandler, IReadOnlySessionState
    {
        public bool IsReusable { get { return false; } }

        protected RequestContext _requestContext { get; set; }

        public SbtechJsHandler()
        {
        }

        public SbtechJsHandler(RequestContext requestContext)
        {
            _requestContext = requestContext;
        }

        public void ProcessRequest(HttpContext context)
        {
            var sb = new StringBuilder();
            var httpContextBase = DependencyResolver.Current.GetService<HttpContextBase>();
            var browserDetectUtility = DependencyResolver.Current.GetService<BrowserUtility>();
            var cmsHelper = DependencyResolver.Current.GetService<CmsHelper>();
            var path = httpContextBase.Request.Url.AbsoluteUri;
            var isMobile = browserDetectUtility.IsMobile();
            var methodType = isMobile == true || path.Contains("mapi") ? "GET" : "POST";
            var mediaPath = isMobile == true || path.Contains("mapi") ? (ConfigurationManager.AppSettings["DefaultDomain"] + "mapi/en-gb/sbtech")
                : (ConfigurationManager.AppSettings["DefaultDomain"] + "api/en-gb/sbtech");

            sb.AppendFormat("function ApiImpl(){{this.errorMessages=new Object(); this.errorMessages[-1]=\"Unknown error.\"; this.errorMessages[-100]=\"Invalid input parameters.\";"
                            + "this.errorMessages[-102]=\"Username is not entered.\"; this.errorMessages[-104]=\"Password is not entered\"; this.errorMessages[-205]=\"Username/password"
                            + " is not correct.\";this.errorMessages[-7]=\"User account is locked.\"; this.siteURL=\"{0}\"; this.linkStatus=this.siteURL+\"/status\";"
                            + " this.linkSessionRefresh=this.siteURL+\"/session\";this.linkLogout=this.siteURL+\"/url?callback=logoutcb\"; this.isMobile={1}; this.DEF_PANEL_WIDTH=800;"
                            + " this.DEF_PANEL_HEIGHT=550; this.PANEL_NAME=\"panel_popup\"; }}", mediaPath, string.Format("{0}", isMobile).ToLower());

            // STATUS
            sb.AppendFormat("ApiImpl.prototype.status=function(callback){{ this.status_callback=callback; var that = this; $.ajax({{ type:'{0}', url:this.linkStatus, crossDomain:true,"
                            + "dataType:\"jsonp\",jsonp:false, jsonpCallback:'jsoncb', data:{{}}, success:function(data){{ that.statusCallback(data);}}}});}}; ", methodType);

            sb.AppendFormat("ApiImpl.prototype.statusCallback=function(data){{ if(this.status_callback){{ var result=new Object(); result.uid=data.uid; result.token=data.token; result.status=data.status;"
                            + " result.message=data.message; result.balance=data.balance; this.status_callback(result);}}}}; ");

            // REFRESH
            sb.AppendFormat("ApiImpl.prototype.refreshSession=function(callback){{ this.refresh_callback=callback; var that = this; $.ajax({{ type:'{0}', url:this.linkSessionRefresh,"
                            + " crossDomain:true,dataType:\"jsonp\", jsonp:false, jsonpCallback:'jsoncb', data:{{}}, success:function(data){{ that.refreshCallback(data);}}}});}}; ", methodType);

            sb.AppendFormat("ApiImpl.prototype.refreshCallback=function(data){{ if(this.refresh_callback){{ var result = new Object(); result.status=data.status; result.message=data.message;"
                            + "result.balance=data.balance; this.refresh_callback(result);}}}}; ");

            var logOutAjaxCall = isMobile == true || path.Contains("mapi") ? string.Format("$.ajax({{ type:'{0}', url:this.linkLogout, crossDomain:true, dataType:\"jsonp\", jsonp:false, data:{{ isMobile:this.isMobile}}, success:function(data){{}}}});", methodType)
                : string.Format("$.ajax({{ type:'{0}', url:this.linkLogout, crossDomain:true, dataType:\"jsonp\", jsonp:false, jsonpCallback:'logoutcb', data:{{ isMobile:this.isMobile }}, success:function(data){{ location.replace(data.url);}}}});", methodType);

            if (isMobile || path.Contains("mapi"))
            {
                sb.AppendFormat("ApiImpl.prototype.getMobileRegistrationURL=function(){{ return getSiteUrl()+\"/en-gb/Mobile/Register\";}}; ");
                sb.AppendFormat("ApiImpl.prototype.getMobileBankURL=function(){{ return getSiteUrl()+\"/en-gb/Mobile/payment/Deposit\";}}; ");
                sb.AppendFormat("function logoutcb(data){{ location.replace(data.url);}} ");
                sb.AppendFormat("function getSBMobNavURL(){{ return getSiteUrl()+\"/en-gb/Mobile/SBMobNav\";}} ");
                sb.AppendFormat("function getSiteUrl(){{ return \"{0}\";}} ", ConfigurationManager.AppSettings["DefaultDomain"].Remove(ConfigurationManager.AppSettings["DefaultDomain"].Length - 1));
            }

            // LOGOUT
            sb.AppendFormat("ApiImpl.prototype.logout=function(){{{0}}}; ", logOutAjaxCall);

            sb.AppendFormat("function getUKRegulationText(){{ return \"{0} offers you the ability to bet in play on a variety of global sporting events and while we make every effort to ensure all"
                            + " live betting information is accurate there maybe situations where such information is incorrect due to technical delays.  Please refer to the betting rules for details of"
                            + " how individual bets are settled in such circumstances.  When checking live betting odds, the live event start times or any other live event markets, please be aware that"
                            + " such information is provided as a guide only and we accept no liability for the outcome of any inaccuracies which may occur.\";}} ", HttpUtility.HtmlEncode(cmsHelper.SiteName));
            sb.AppendFormat("var whl=new ApiImpl();");

            if (!isMobile)
            {
                sb.AppendFormat("var sendDimensions = function () {{ ");
                sb.AppendFormat("height = document.body !== null? document.body.offsetHeight : 0; ");
                sb.AppendFormat("window.parent.postMessage({{ 'height': height }}, '*');}}; ");
                sb.AppendFormat("setInterval(sendDimensions, 500); ");
            }

            context.Response.ContentEncoding = Encoding.UTF8;
            context.Response.ContentType = "text/javascript";

            byte[] bytes = Encoding.UTF8.GetBytes(sb.ToString());
            context.Response.OutputStream.Write(bytes, 0, bytes.Length);
        }
    }
}