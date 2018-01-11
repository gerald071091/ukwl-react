﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
﻿using System.IO;
﻿using System.Linq;
using System.Net;
using System.Net.Mime;
﻿using System.Threading;
﻿using System.Web;
using System.Web.Http;
using System.Web.Http.Routing;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.SessionState;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Exceptions;
﻿using AFT.RegoApi.Proxy.Implementations;
﻿using AFT.RegoApi.Proxy.Interfaces;

﻿using AFT.WebCore.Config;
﻿using AFT.WebCore.Utils;

using Common.Logging;
﻿using Microsoft.Practices.Unity;
﻿using Microsoft.Practices.Unity.InterceptionExtension;
﻿using RestSharp;

namespace AFT.WebCore
{
    [ExcludeFromCodeCoverage]
    public abstract class MvcApplication : HttpApplication
    {
        private static readonly ILog Log = LogManager.GetLogger<MvcApplication>();

        protected virtual void RegisterDependentServices()
        {
            Log.Debug("Registering dependent services.");

            string apiBaseUrl = ConfigurationManager.AppSettings["ApiBaseUrl"];

            if (string.IsNullOrWhiteSpace(apiBaseUrl))
            {
                throw new ConfigurationErrorsException("ApiBaseUrl not found.");
            }

            var container = new UnityContainer();
            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

            container.AddNewExtension<Interception>();


            container.RegisterType<IAccountApiProxy, AccountApiProxy>();
            container.RegisterType<IAnnouncementApiProxy, AnnouncementApiProxy>();
            container.RegisterType<IBalanceApiProxy, BalanceApiProxy>();
            container.RegisterType<IBonusApiProxy, BonusApiProxy>();
            container.RegisterType<ICasinoApiProxy, CasinoApiProxy>();
            container.RegisterType<IFinancialBettingApiProxy, FinancialBettingApiProxy>();
            container.RegisterType<ILiveCasinoApiProxy, LiveCasinoApiProxy>();
            container.RegisterType<IPaymentApiProxy, PaymentApiProxy>();
            container.RegisterType<IPromotionApiProxy, PromotionApiProxy>();
            container.RegisterType<ISportsbookApiProxy, SportsbookApiProxy>();
            container.RegisterType<ITransferFundApiProxy, TransferFundApiProxy>();
            container.RegisterType<ITermsAndConditionsApiProxy, TermsAndConditionsApiProxy>();
            container.RegisterType<IUtilityApiProxy, UtilityApiProxy>();
            container.RegisterType<IApiProxyCacheManager, ApiProxyMemoryCacheManager>(); // register proxy cache
            container.RegisterType<IRegoIdentity, RegoSessionIdentity>();


            container.RegisterType<IRestClient, CustomRestClient>(new InjectionConstructor(apiBaseUrl),
                new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<LoggingInterceptionBehavior>());

            container.RegisterType<HttpContextBase>(new InjectionFactory(x => new HttpContextWrapper(HttpContext.Current)));
           
            Log.Debug("Registered dependent services.");
        }

        protected abstract void RegisterRoutes();

        protected virtual void RegisterFilters()
        {
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        protected virtual void InitializeWhiteLabelApi()
        {
            Log.Debug("Initializing white label API.");

            GlobalConfiguration.Configure(WebApiConfig.Register);

            Log.Debug("Initialized white label API.");
        }

        protected virtual string DefaultCultureCode
        {
            get { return "en-gb"; }
        }
		
        protected void Application_Start()
        {
            Log.Debug("Application Start");

            MvcHandler.DisableMvcResponseHeader = true;

            RegisterDependentServices();
            //AreaRegistration.RegisterAllAreas();
            InitializeWhiteLabelApi();
            RegisterFilters();

            // Register overall routings that should apply to all whitelabel projects

            RouteConifg.RegisterRoutes(RouteTable.Routes);

            // This allows each whitelabel projects to configure it's own routes
            RegisterRoutes();
        }

        protected void Application_PreSendRequestHeaders(Object sender, EventArgs e)
        {
            try
            {
                var app = sender as HttpApplication;
                if (app == null || app.Context == null)
                {
                    return;
                }

                app.Context.Response.Headers.Remove("Server");
            }
            catch (Exception ex)
            {
                Log.Error("Failed to remove headers", ex);
            }
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            InitializeCulture();
            ValidateClientIpAddress();
        }

        protected virtual void ValidateClientIpAddress()
        {
            if (IsWebApiRequest())
            {
                return;
            }

            var httpContext = Request.RequestContext.HttpContext;

            var userContext = DependencyResolver.Current.GetService<UserContext>();

            if (userContext.LoggedIn)
            {
                return;
            }

            if (httpContext.Request.UserAgent != null)
            {
                if (httpContext.Request.UserAgent.Contains("Googlebot"))
                {
                    return;
                }
            }

            var networkUtility = DependencyResolver.Current.GetService<NetworkUtility>();
            var utilityApiProxy = DependencyResolver.Current.GetService<IUtilityApiProxy>();
            var cultureUtility = DependencyResolver.Current.GetService<CultureUtility>();
            var configurations = DependencyResolver.Current.GetService<Configurations>();

            var ipAddress = networkUtility.GetClientIPAddress();
            var cultureCode = cultureUtility.GetCultureCode();

            cultureCode = string.IsNullOrWhiteSpace(cultureCode) ? DefaultCultureCode : cultureCode;

            try
            {
                var ipBlockedResult = utilityApiProxy.IPBlocked(cultureCode, ipAddress, networkUtility.GetServerHost(),
                    IPBlockType.Others);

                if (!ipBlockedResult.Blocked)
                {
                    return;
                }

                if (!ipBlockedResult.UseDefaultRedirectUrl)
                {
                    Log.InfoFormat("IP address {0} is blocked. Redirect visitor to {1}", ipAddress,
                        ipBlockedResult.RedirectUrl);

                    httpContext.Response.Redirect(ipBlockedResult.RedirectUrl, false);
                    return;
                }
            }
            catch (SessionExpiredException)
            {
                Log.Error("Session expired.");
                httpContext.Response.Redirect("/", true);
                httpContext.Response.End();
            }
            catch (DeactivatedAccountException)
            {
                Log.Error("Account Deactivated.");
                httpContext.Response.Redirect("/", true);
                httpContext.Response.End();
            }
            catch (ApiProxyBrokenException ex)
            {
                Log.Error("Error occurs when calling API.", ex);
                DisplayErrorPage(httpContext, configurations, cultureUtility, HttpStatusCode.InternalServerError,
                    HttpStatusCode.InternalServerError);
            }
            catch (Exception ex)
            {
                Log.Error("Unexpected error.", ex);
                DisplayErrorPage(httpContext, configurations, cultureUtility, HttpStatusCode.InternalServerError,
                    HttpStatusCode.InternalServerError);
            }

            Log.InfoFormat("IP address {0} is blocked.", ipAddress);
            DisplayErrorPage(httpContext, configurations, cultureUtility, HttpStatusCode.Forbidden, HttpStatusCode.OK);
        }

        private void DisplayErrorPage(HttpContextBase httpContext, Configurations configurations,
            CultureUtility cultureUtility, HttpStatusCode fileHttpStatusCode, HttpStatusCode headerHttpStatusCode)
        {
            string errorPagePath = string.Format(configurations.ErrorPagePath, (int)fileHttpStatusCode,
                cultureUtility.GetCultureCode());

            if (!File.Exists(Server.MapPath(errorPagePath)))
            {
                errorPagePath = string.Format(configurations.ErrorPagePath, (int)HttpStatusCode.NotFound,
                    DefaultCultureCode);
            }

            Log.InfoFormat("Displaying {0}.", errorPagePath);

            httpContext.Response.StatusCode = (int)headerHttpStatusCode;
            httpContext.Response.ContentType = MediaTypeNames.Text.Html;
            httpContext.Response.WriteFile(errorPagePath);
            httpContext.Response.End();
        }

        protected virtual void InitializeCulture()
        {
            var httpContext = Request.RequestContext.HttpContext;

            if (httpContext == null)
            {
                return;
            }

            var routeData = RouteTable.Routes.GetRouteData(httpContext);

            if (routeData == null)
            {
                return;
            }

            var culture = routeData.Values["culture"] as string;

            if (culture == null)
            {
                var subroutes = routeData.Values["MS_SubRoutes"] as IEnumerable<IHttpRouteData>;

                if (subroutes != null)
                {
                    var route = subroutes.First().Values;

                    if (route.Any() && route.ContainsKey("culture"))
                    {
                        culture = route["culture"] as string;
                    }
                }
            }

            Thread.CurrentThread.CurrentCulture = new CultureInfo(culture ?? DefaultCultureCode);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Log.Error("Application error.", Server.GetLastError());
        }

        #region Enables Session in Web API

        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }

        private bool IsWebApiRequest()
        {
            string path = HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath;

            return !string.IsNullOrEmpty(path) && (path.StartsWith("~/api") || path.StartsWith("~/mapi"));
        }

        #endregion Enables Session in Web API

        protected void Session_Start(object sender, EventArgs e)
        {
            //ValidateClientIpAddress();
        }
    }
}