using System.Diagnostics.CodeAnalysis;
using System.Web.Mvc;
using AFT.WebCore.Filters;

namespace AFT.WebCore.Config
{
    [ExcludeFromCodeCoverage]
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new ValidateSingleLoginAttribute());
        }
    }
}