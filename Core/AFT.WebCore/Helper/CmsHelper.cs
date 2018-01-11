using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Utils;

using Common.Logging;


namespace AFT.WebCore.Helper
{
    public partial class CmsHelper
    {
        protected readonly Func<HtmlHelper> HtmlHelperProvider;
        private static readonly ILog Logger = LogManager.GetLogger<CmsHelper>();
        private readonly string _cultureCode;
        private readonly string _protocol;

        public HtmlHelper HtmlHelper { get { return HtmlHelperProvider(); } }

        public CmsHelper(Func<HtmlHelper> htmlHelperProvider)
        {
            if (htmlHelperProvider == null) throw new ArgumentNullException("htmlHelperProvider");
            HtmlHelperProvider = htmlHelperProvider;

            var cultureUtility = DependencyResolver.Current.GetService<CultureUtility>();
            _cultureCode = cultureUtility.GetCultureCode();

            var protocol = DependencyResolver.Current.GetService<HttpContextBase>();
            _protocol = protocol.Request.Url.Scheme;
        }

        public string CultureCode
        {
            get
            {
                var cultureUtility = DependencyResolver.Current.GetService<CultureUtility>();
                return cultureUtility.GetCultureCode();
            }
        }

        public Guid PlayerId
        {
            get
            {
                var userContext = DependencyResolver.Current.GetService<UserContext>();
                return userContext.UserId;
            }
        }

        public bool IsAuthenticated
        {
            get
            {
                var userContext = DependencyResolver.Current.GetService<UserContext>();
                return userContext.LoggedIn;
            }
        }

        public string MediaVersion
        {
            get
            {
                return ConfigurationManager.AppSettings["MediaVersion"];
            }
        }

        public string Media(string filePath)
        {
            var mediaUrl = ConfigurationManager.AppSettings["MediaManagerUrl"];

            return mediaUrl + filePath;

        }

        public Uri SportsbookNonLoginUrl(bool isMobile = false)
        {
            var sportsbookApiProxy = DependencyResolver.Current.GetService<ISportsbookApiProxy>();

            return isMobile
                ? sportsbookApiProxy.GetSbTechMobileUrl(_cultureCode)
                : sportsbookApiProxy.GetSbTechUrl(_cultureCode);
        }

        public Uri SportsbookUrl(bool isMobile = false)
        {
            var userContext = DependencyResolver.Current.GetService<UserContext>();
            var sportsbookApiProxy = DependencyResolver.Current.GetService<ISportsbookApiProxy>();

            if (isMobile)
                return userContext.LoggedIn
                    ? sportsbookApiProxy.GetSbTechMobileUrl(_cultureCode, userContext.Username)
                    : sportsbookApiProxy.GetSbTechMobileUrl(_cultureCode);

            return userContext.LoggedIn
                ? sportsbookApiProxy.GetSbTechUrl(_cultureCode, userContext.Username)
                : sportsbookApiProxy.GetSbTechUrl(_cultureCode);
        }

        /// <summary>
        /// Returns key-value pair of CSRF token for current visiting state
        /// </summary>
        /// <returns></returns>
        public KeyValuePair<string, string> CSRFToken()
        {
            string cookieToken, formToken;
            AntiForgery.GetTokens(null, out cookieToken, out formToken);
            var pair = new KeyValuePair<string, string>(Constants.CsrfTokenName, string.Format("{0}:{1}", cookieToken, formToken));

            return pair;
        }

        public bool IsMobile
        {
            get
            {
                var browserDetectUtility = DependencyResolver.Current.GetService<BrowserUtility>();
                return browserDetectUtility.IsMobile();
            }
        }

        public string PageTitle()
        {
            return "";
        }

        public string PageKeywords()
        {
            return "";
        }

        public string PageDescription()
        {
            return "";
        }

        public string SiteName
        {
            get
            {
                return ConfigurationManager.AppSettings["SiteName"];
            
            }
        }

        public string SiteUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["SiteUrl"];
            }
        }

        public string DocsEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["DocsEmail"];
            }
        }

        public string SupportEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["SupportEmail"];
            }
        }

        public string RegisteredNumber
        {
            get
            {
                return ConfigurationManager.AppSettings["RegisteredNumber"];
            }
           
        }

        public string RegisteredAddress
        {
            get
            {
                return ConfigurationManager.AppSettings["RegisteredAddress"];
            }
        }

        public string RegisteredCompany
        {
            get
            {
                return ConfigurationManager.AppSettings["RegisteredCompany"];
            }
        }

        public void RedirectAuthorized(string path = "/")
        {
            if (IsAuthenticated)
            {
                HttpContext.Current.Response.Redirect(path, true);
            }
        }

        public void RedirectUnauthorized(string path = "/")
        {
            if (!IsAuthenticated)
            {
                HttpContext.Current.Response.Redirect(path, true);
            }
        }

        public static void RedirectToHttps()
        {
            if (HttpContext.Current.Request.IsSecureConnection.Equals(false))
            {
                HttpContext.Current.Response.Redirect("https://" + HttpContext.Current.Request.ServerVariables["HTTP_HOST"] + HttpContext.Current.Request.RawUrl);
            }
        }

        public string GetCultureSegment()
        {
            var cultureCode = CultureCode;
            return string.IsNullOrEmpty(cultureCode) ? "" : "/" + cultureCode;
        }
        
        public void TrackBTag(string key = "bTag", int expiryDays = 30)
        {
            var contextBase = DependencyResolver.Current.GetService<HttpContextBase>();
            var bTag = new BTagTracker(contextBase);
            bTag.TrackBTag(key, expiryDays);
        }

        public string GetBTag(string key = "bTag")
        {
            var contextBase = DependencyResolver.Current.GetService<HttpContextBase>();
            var bTag = new BTagTracker(contextBase);
            return bTag.GetBTag(key);
        }

        public string LogoURL
        {
            get { return Media(ConfigurationManager.AppSettings["LogoUrl"]); }
        }

        public string DefaultDomain
        {
            get { return Media(ConfigurationManager.AppSettings["DefaultDomain"]); }
        }

        public string Username
        {
            get
            {
                var userContext = DependencyResolver.Current.GetService<UserContext>();
                return userContext.Username;
            }
        }

        public string Currency
        {
            get
            {
                var userContext = DependencyResolver.Current.GetService<UserContext>();
                return userContext.Currency;
            }
        }

        public string SitePrefix
        {
            get
            {
                return ConfigurationManager.AppSettings["SitePrefix"];
            }
        }

        public string IOvation3rdPartyJs
        {
            get { return ConfigurationManager.AppSettings["IOVation3rdPartyJs"]; }
        }


        #region 138uk mobile redirectionURL cookie

        public void SetPrevUrl()
        {
            HttpCookie _returnUrl = new HttpCookie("rUrl");
            string prevUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            _returnUrl.Value = prevUrl;
            _returnUrl.Expires = DateTime.Today.AddDays(1);
            HttpContext.Current.Response.Cookies.Add(_returnUrl);
        }

        public string getPrevUrl()
        {
            try
            {
                return HttpContext.Current.Request.Cookies["rUrl"].Value;
            }
            catch (Exception ex)
            {
                Logger.Error("Cannot retrieve url", ex);
                return string.Empty;
            }

        }

        public void deletePrevUrl()
        {
            try
            {
                var rUrl = HttpContext.Current.Request.Cookies["rUrl"];
                if (rUrl != null)
                {
                    HttpContext.Current.Response.Cookies.Remove("rUrl");
                    rUrl.Expires = DateTime.Today.AddDays(-1);
                    HttpContext.Current.Response.SetCookie(rUrl);
                }
            }
            catch (Exception ex)
            {
                Logger.Error("rUrl cookie is not defined", ex);
            }

        }

        #endregion 138uk mobile redirectionURL cookie

        #region callbackURL

        public string SkrillCallbackURL
        {
            get
            {
                if (IsMobile)
                {
                    return _protocol + "://" + ConfigurationManager.AppSettings["skrillReturnUrlPrefix"] + "/mobile";
                }

                return _protocol + "://" + ConfigurationManager.AppSettings["skrillReturnUrlPrefix"];
            }
  
        }

        public string WorldPayCallbackURL
        {
            get
            {
                if (IsMobile)
                {

                   Uri result = null;

                    if (Uri.TryCreate(new Uri(_protocol + "://" + ConfigurationManager.AppSettings["skrillReturnUrlPrefix"]), "/mobile/Payment/WorldPay3DSecureCallback", out result))
                    {

                        return result.ToString();
                    }
                }

                return _protocol + "://" + ConfigurationManager.AppSettings["worldPayReturnUrlPrefix"]; 
            }
                
        }

        public string SportsbookURL
        {
            get {
                if (IsMobile)
                {
                    return ConfigurationManager.AppSettings["sportsbookUrl"].Substring(0,6) + "/mobile/sportsbook"; 
                }

                return ConfigurationManager.AppSettings["sportsbookUrl"]; 
            }
        }

        public string LandingPageURL
        {
            get { return ConfigurationManager.AppSettings["landingPageUrl"]; }
        }

        public string CasinoURL
        {
            get {

                if (IsMobile)
                {
                    Uri result = null;

                    if (Uri.TryCreate(new Uri(_protocol+ "://" + ConfigurationManager.AppSettings["casinoUrl"]), "/mobile/casino", out result))
                    {
                        return result.ToString();
                    }
                }

                return _protocol + "://" + ConfigurationManager.AppSettings["casinoUrl"]; 
            }
            
        }

        public string DepositURL
        {
            get {
                return _protocol + "://" + ConfigurationManager.AppSettings["depositUrl"]; 
            }
        }

        #endregion callbackURL

        public string RegisteredLocation
        {
            get
            {
                return ConfigurationManager.AppSettings["RegisteredLocation"];
            }
        }
    }
}