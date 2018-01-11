using System.Diagnostics.CodeAnalysis;
using System.Web.Http;
using AFT.WebCore.Filters;
using AFT.WebCore.Handlers;
using Microsoft.Practices.Unity;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Unity.Mvc5;

namespace AFT.WebCore.Config
{
    [ExcludeFromCodeCoverage]
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //var container = new UnityContainer();
            //config.DependencyResolver = new UnityDependencyResolver(container);

            /*
             * To Do: http://ericpanorel.net/2013/07/28/spa-authentication-and-csrf-mvc4-antiforgery-implementation/ for SPA version
             */
#if (DEBUG || DEVELOP || QA)
            config.MessageHandlers.Add(new LogRequestAndResponseHandler());
#else
            config.Filters.Add(new AntiForgeryTokenAttribute());
#endif

            config.Filters.Add(new AuthorizeAttribute());
            config.Filters.Add(new HandleExceptionAttribute());

            config.MapHttpAttributeRoutes();

            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Never;
        }
    }
}