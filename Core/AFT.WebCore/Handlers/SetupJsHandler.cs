//using System.Diagnostics.CodeAnalysis;
//using System.Text;
//using System.Web;
//using System.Web.Helpers;
//using System.Web.Mvc;
//using System.Web.Routing;
//using System.Web.SessionState;
//using AFT.WebCore.Utils;

//namespace AFT.WebCore.Handlers
//{
//    [ExcludeFromCodeCoverage]
//    public class SetupJsHandler : IHttpHandler, IReadOnlySessionState
//    {
//        public bool IsReusable { get { return false; } }

//        protected RequestContext RequestContext { get; set; }

//        public SetupJsHandler()
//        {
//        }

//        public SetupJsHandler(RequestContext requestContext)
//        {
//            RequestContext = requestContext;
//        }

//        public void ProcessRequest(HttpContext context)
//        {
//            var cultureUtility = DependencyResolver.Current.GetService<CultureUtility>();
//            var cultureCode = cultureUtility.GetCultureCode();

//            var sb = new StringBuilder();

//            sb.AppendFormat("window.culture='{0}';", cultureCode);

//            // Media Manager Path
//            using (var helper = new CdnHelper())
//            {
//                var mediaPath = HttpUtility.HtmlEncode(helper.GetMediaUrl(""));
//                sb.AppendFormat("window.mediaRoot='{0}';", mediaPath);
//                sb.Append("window.cmsMedia=function(path){return(window.mediaRoot+path);};");
//            }

//            var browserDetectUtility = DependencyResolver.Current.GetService<BrowserUtility>();
//            var isMobile = browserDetectUtility.IsMobile();
//            sb.AppendFormat("window.isMobile={0};", isMobile.ToString().ToLower());

//            // CSRF
//            string cookieToken, formToken;
//            AntiForgery.GetTokens(null, out cookieToken, out formToken);
//            sb.AppendFormat("window.csrfToken='{0}:{1}';", cookieToken, formToken);
//            sb.AppendFormat("window.csrfTokenName='{0}';", Constants.CsrfTokenName);

//            // currency
//            var userContext = DependencyResolver.Current.GetService<UserContext>();

//            if (userContext.LoggedIn)
//            {
//                string currencySymbol;

//                CurrencyUtility.TryGetCurrencySymbol(userContext.Currency, out currencySymbol);

//                sb.AppendFormat("window.currencySymbol='{0}';", currencySymbol ?? "£");
//            }

//            // isAuthed
//            sb.AppendFormat("window.authed={0};", userContext.LoggedIn.ToString().ToLowerInvariant());

//            // username
//            if (userContext.LoggedIn)
//            {
//                sb.AppendFormat("window.username='{0}';", userContext.Username);
//            }

//            context.Response.ContentEncoding = Encoding.UTF8;
//            context.Response.ContentType = "text/javascript";

//            byte[] bytes = Encoding.UTF8.GetBytes(sb.ToString());
//            context.Response.OutputStream.Write(bytes, 0, bytes.Length);
//        }
//    }
//}