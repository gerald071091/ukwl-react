using System;
using System.Diagnostics.Contracts;
using System.Net;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;

using AFT.WebCore;
using AFT.WebCore.Utils;
using AFT.WebCore.Helper;

namespace AFT.WebCore.Controllers
{
    public class DefaultController : Controller
    {
        private readonly CultureUtility _cultureUtility;
        private readonly HttpContextBase _httponContextBase;
        private readonly CmsHelper _cmsHelper;
        private readonly Configurations _configurations;

        //public DefaultController()
        //{
        //}

        public DefaultController(CultureUtility cultureUtility, HttpContextBase httponContextBase, CmsHelper cmsHelper, Configurations configuration)
        {
            Contract.Requires(cultureUtility != null);
            Contract.Requires(httponContextBase != null);
            Contract.Requires(configuration != null);

            _cultureUtility = cultureUtility;
            _httponContextBase = httponContextBase;
            _cmsHelper = cmsHelper;
            _configurations = configuration;
        }

        public ActionResult ProccessRequest(string url)
        {
            try
            {
                return View(String.Format("~/Views/{0}.cshtml", "index"));
            }
            catch (Exception ex)
            {
                HttpException httpException = ex as HttpException;

                switch (httpException.GetHttpCode())
                {
                    case 403:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.Forbidden,
                                _cultureUtility.GetCultureCode()));

                    case 404:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.NotFound,
                                _cultureUtility.GetCultureCode()));

                    default:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
                                _cultureUtility.GetCultureCode()));
                }
            }
        }

        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult ProccessRequestWithCulture(string url)
        {
            try
            {
                return View(String.Format("~/Views/{0}.cshtml", "index"));
            }
            catch (Exception ex)
            {
                HttpException httpException = ex as HttpException;

                switch (httpException.GetHttpCode())
                {
                    case 403:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.Forbidden,
                                _cultureUtility.GetCultureCode()));

                    case 404:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.NotFound,
                                _cultureUtility.GetCultureCode()));

                    default:
                        return View(string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
                                _cultureUtility.GetCultureCode()));
                }  
            }
       
        }

        public ActionResult GameInterface()
        {
            return View("~/Views/qf/gameinterface.cshtml");
        }

        #region private method(s)

        private bool ViewExists(string name)
        {
            ViewEngineResult result = ViewEngines.Engines.FindView(ControllerContext, name, null);
            return (result.View != null);
        }

        #endregion private method(s)
    }
}