using System.Diagnostics.CodeAnalysis;
using System.Web.Mvc;
using System.Web.Routing;

namespace AFT.WebCore.Config
{
    [ExcludeFromCodeCoverage]
    public static class RouteConifg
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("scripts/setup.js");
            routes.IgnoreRoute("{culture}/scripts/setup.js");
            routes.IgnoreRoute("scripts/sbtech/api.js");
            routes.IgnoreRoute("scripts/sbtech/mapi.js");
            routes.IgnoreRoute("{culture}/scripts/sbtech/api.js");
            routes.IgnoreRoute("{culture}/scripts/sbtech/mapi.js");
            routes.IgnoreRoute("iojs/{*url}");

            routes.MapRoute(name: "QFGameInterface",
                             url: "qf/gameinterface",
                        defaults: new { controller = "Default", action = "GameInterface" },
                     namespaces: new[] { "AFT.WebCore.Controllers" });

            routes.MapRoute(name: "WorldPay3DSecureCallback",
                             url: "{culture}/Payment/WorldPay3DSecureCallback",
                        defaults: new { controller = "Payment", action = "WorldPay3DSecureCallback" },
                     constraints: new { culture = "[a-z]{2}|[a-z]{2}-[a-z]{2}" },
                     namespaces: new[] { "AFT.WebCore.Controllers" });

            routes.MapRoute(name: "WorldPay3DSecureCallbackForMobile",
                             url: "{culture}/{mobile}/Payment/WorldPay3DSecureCallback",
                        defaults: new { controller = "Payment", action = "WorldPay3DSecureCallback" },
                     constraints: new { culture = "[a-z]{2}|[a-z]{2}-[a-z]{2}", mobile = "mobile" },
                     namespaces: new[] { "AFT.WebCore.Controllers" });

            routes.MapRoute(
                name: "DefaultWithLang",
                url: "{culture}/{*url}",
                defaults: new { controller = "Default", action = "ProccessRequestWithCulture" },
                constraints: new { culture = "[a-z]{2}|[a-z]{2}-[a-z]{2}" },
                namespaces: new[] { "AFT.WebCore.Controllers" }
            );
            routes.MapRoute(
                name: "Default",
                url: "{*url}",
                defaults: new { controller = "Default", action = "ProccessRequest" },
                namespaces: new[] { "AFT.WebCore.Controllers" }
            );
        }
    }
}