using System;
using System.Diagnostics.CodeAnalysis;
using System.Web.Mvc;
using Common.Logging;

namespace AFT.WebCore.Filters
{
    [ExcludeFromCodeCoverage]
    public class ValidateSingleLoginAttribute : ActionFilterAttribute
    {
        private static readonly ILog Logger = LogManager.GetLogger("WhitelabelApi");

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                var userContext = DependencyResolver.Current.GetService<UserContext>();

                if (!userContext.LoggedIn)
                {
                    return;
                }

//#if !(DEBUG || DEVELOP)

//                #region validate with session in database

//                // Validate Session against session stored in db
//                var loginsManager = DependencyResolver.Current.GetService<LoginsManager>();

//                var validSession = loginsManager.ValidateSession(userContext.UserId.ToString(), filterContext.HttpContext.Session.SessionID);

//                if (validSession)
//                {
//                    return;
//                }

//                Logger.Info("Session/Cookie is missing. Sign out user.");
//                userContext.LogOut();

//                if (!filterContext.HttpContext.Request.IsAjaxRequest())
//                {
//                    filterContext.HttpContext.Response.Redirect("/", true);
//                    filterContext.HttpContext.Response.End();
//                }

//                #endregion validate with session in database

//#endif
            }
            catch (Exception ex)
            {
                Logger.Error("Fail to retrieve player's information.", ex);
            }
        }
    }
}