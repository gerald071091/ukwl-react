using System;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;
using System.Net;
using System.Net.Mime;
using System.Security.Policy;
using System.Web;
using System.Web.Mvc;
using AFT.RegoCMS.Engine;
using AFT.RegoCMS.Security;
using AFT.RegoCMS.WhiteLabel.Utils;
using Common.Logging;
using System.Text.RegularExpressions;

namespace AFT.RegoCMS.WhiteLabel.Cms
{
    [ExcludeFromCodeCoverage]
    public class CmsController : Controller
    {
        private static readonly ILog Log = LogManager.GetLogger<CmsController>();

        private readonly CmsEngine _cmsEngine;
        private readonly CultureUtility _cultureUtility;
        private readonly HttpContextBase _httponContextBase;
        private readonly Configurations _configurations;

        public CmsController(CmsEngine cmsEngine, CultureUtility cultureUtility, HttpContextBase httponContextBase, Configurations configurations)
        {
            Contract.Requires(cmsEngine != null);
            Contract.Requires(cultureUtility != null);
            Contract.Requires(httponContextBase != null);
            Contract.Requires(configurations != null);

            _cmsEngine = cmsEngine;
            _cultureUtility = cultureUtility;
            _httponContextBase = httponContextBase;
            _configurations = configurations;
        }

        private bool AtPreviewMode()
        {
            var preview = _httponContextBase.Request.Cookies["Preview"];

            if (preview == null)
            {
                return false;
            }

            bool previewMode;

            bool.TryParse(preview.Value, out previewMode);

            return previewMode;
        }

        private bool InvalidCrossSiteAuth()
        {
            var crossSiteAuth = _httponContextBase.Request.Cookies[_configurations.CrossSiteAuthCookieName];
            return crossSiteAuth == null || !CanDecrypTicket(crossSiteAuth.Value);
        }

        [HttpGet]
        public virtual ActionResult ProcessRequest()
        {
            if (AtPreviewMode() && InvalidCrossSiteAuth())
            {
                return new HttpUnauthorizedResult();
            }

            // check with repository for redirection mappings
            if (_httponContextBase.Request.Url != null)
            {
                var redirUrl = _cmsEngine.RedirectionLookup(_httponContextBase.Request.Url);
                if (!string.IsNullOrEmpty(redirUrl))
                {
                    return new RedirectResult(string.Format("/{0}/{1}", _cultureUtility.GetCultureCode(), redirUrl));
                }
            }

            CmsEngine.Response response;

            //try
            //{
#if(DEBUG)
                response = this.ProcessFakeRequest(_httponContextBase.Request.Url,
                   new MvcRequestContext(ControllerContext, ViewData, TempData));
#else
                response = _cmsEngine.ProcessRequest(_httponContextBase.Request.Url,
                   new MvcRequestContext(ControllerContext, ViewData, TempData));
#endif
            //}
            //catch (Exception ex)
            //{
            //    Log.Error("Internal CMS error.", ex);
            //    throw ex;
            //    return
            //        new FilePathResult(
            //            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
            //                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);
            //}

            switch (response.Type)
            {
                case CmsEngine.ResponseType.OK:
                    return Content(response.Body);

                case CmsEngine.ResponseType.PageNotFound:
                    return
                        new FilePathResult(
                            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.NotFound,
                                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);

                default:
                    return
                        new FilePathResult(
                            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
                                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);
            }
        }


        [HttpGet]
        public virtual ActionResult ProcessAngularRequest()
        {
            if (AtPreviewMode() && InvalidCrossSiteAuth())
            {
                return new HttpUnauthorizedResult();
            }
            
            CmsEngine.Response response;
            //try
            //{
#if(DEBUG)
                return this.ProcessFakeAngularRequest();
#else
                var origUrl = _httponContextBase.Request.Url;
                if (origUrl == null)
                {
                    response = new CmsEngine.Response {Type = CmsEngine.ResponseType.Error};
                }
                else
                {
                    var absolutePath = origUrl.AbsolutePath.ToLower().Replace("/templates", "").Replace(".html", "").Replace(".htm", "");
                    var uriBuilder = new System.UriBuilder(origUrl.AbsoluteUri)
                    {
                        Path = absolutePath
                    };
                    response = _cmsEngine.ProcessRequest(uriBuilder.Uri, new MvcRequestContext(ControllerContext, ViewData, TempData));
                }
#endif
            //}
            //catch (Exception ex)
            //{
            //    Log.Error("Internal CMS error.", ex);
            //    return
            //        new FilePathResult(
            //            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
            //                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);
            //}

            switch (response.Type)
            {
                case CmsEngine.ResponseType.OK:
                    return Content(response.Body);

                case CmsEngine.ResponseType.PageNotFound:
                    return
                        new FilePathResult(
                            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.NotFound,
                                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);

                default:
                    return
                        new FilePathResult(
                            string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
                                _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);
            }
        }


        /// <summary>
        /// Render a static view page locally directly instead of rendering from database content.
        /// Note that every view should have a layout section defined (_ViewStart.cshtml will not work in this case)
        ///
        /// Folloring rendering rule applies:
        /// http://host:port/                  --- ~/Views/Default.cshtml
        /// http://host:post/en-gb/            --- ~/Views/en-gb/Index.cshtml
        /// http://host:post/en-gb/mobile      --- ~/Views/en-gb/mobile/Index.cshtml    (if Mobile.cshtml is not found, fallback to ~/Views/en-gb/mobile/Index.cshtml
        /// -------------------------------------------------------------------------- following urls should have equivlent patterns
        /// http://host:post/en-gb/help/rules  --- ~/Views/en-gb/help/rules.cshtml
        /// </summary>
        /// <param name="url"></param>
        /// <param name="mvcRequestContext"></param>
        /// <returns></returns>
        public CmsEngine.Response ProcessFakeRequest(Uri url, MvcRequestContext mvcRequestContext)
        {
            // look for culture strings
            var abs = (url.AbsolutePath == "/") ? "/Default" : url.AbsolutePath;

            var cultureRegex = new System.Text.RegularExpressions.Regex(@"^\/(?<culture>[a-zA-Z]{2}\-[a-zA-Z]{2})?\/?");
            var result = cultureRegex.Match(url.AbsolutePath);
            var culture = result.Groups["culture"];

            if (culture.Success && abs.EndsWith(culture.Value))
                abs += "/Index";
            var viewName = string.Format("~/Views{0}.cshtml", abs);

            // Fallback to Index.cshtml if abs file is not found
            if (!System.IO.File.Exists(Server.MapPath(viewName)))
            {
                viewName = string.Format("~/Views{0}.cshtml", abs + "/Index");
            }

            var pageHtmlBuilder = mvcRequestContext.RenderRazorViewToString(viewName: viewName, languageCode: culture.Success ? culture.Value : "", model: new object());

            if (pageHtmlBuilder == null)
                return new CmsEngine.Response { Type = CmsEngine.ResponseType.PageNotFound };

            return new CmsEngine.Response { Body = pageHtmlBuilder.ToString(), Type = CmsEngine.ResponseType.OK };
        }

        /// <summary>
        /// Process incoming .html page request, this is to be used for angularjs to load templates
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public virtual ActionResult ProcessFakeAngularRequest()
        {
            if (AtPreviewMode() && InvalidCrossSiteAuth())
            {
                return new HttpUnauthorizedResult();
            }

            var url = _httponContextBase.Request.Url;
            var mvcRequestContext = new MvcRequestContext(ControllerContext, ViewData, TempData);

            // look for culture strings
            var absolutePath = url.AbsolutePath.ToLower().Replace("/templates", "").Replace(".html", "").Replace(".htm", "");

            var abs = (absolutePath == "/") ? "/Default" : absolutePath;

            var cultureRegex = new System.Text.RegularExpressions.Regex(@"^\/(?<culture>[a-zA-Z]{2}\-[a-zA-Z]{2})?\/?");
            var result = cultureRegex.Match(absolutePath);
            var culture = result.Groups["culture"];

            if (culture.Success && abs.EndsWith(culture.Value))
                abs += "/Index";



            var viewName = string.Format("~/Views{0}.cshtml", abs);

            // Fallback to Index.cshtml if abs file is not found
            if (!System.IO.File.Exists(Server.MapPath(viewName)))
            {
                viewName = string.Format("~/Views{0}.cshtml", abs + "/Index");
            }

            var pageHtmlBuilder = mvcRequestContext.RenderRazorViewToString(viewName: viewName, languageCode: culture.Success ? culture.Value : "", model: new object());



            if (pageHtmlBuilder == null)
            {
                return HttpNotFound();
            }
            else {

                var htmlStr = pageHtmlBuilder.ToString();

                // Remove Layout definition
                var regex = new Regex("Layout\\s=\\s\\\".*\\.cshtml\";");
                var newMarkup = regex.Replace(htmlStr, "");

                return Content(newMarkup);
            }
        }
        



        private bool CanDecrypTicket(string encrypted)
        {
            try
            {
                var ticketManager = new TicketManager(_configurations.TicketKey, _configurations.TicketHashKey);
                AuthenticationTicket ticket = ticketManager.Decrypt(encrypted);
                return ticket != null;
            }
            catch (ArgumentException)
            {
                return false;
            }
        }
    }
}