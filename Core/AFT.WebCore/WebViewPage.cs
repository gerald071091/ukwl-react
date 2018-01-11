using System.Diagnostics.CodeAnalysis;
using System.Web.Mvc;

using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Integration;
using AFT.WebCore.Utils;

namespace AFT.WebCore
{
    public abstract class WebViewPage<TModel> : System.Web.Mvc.WebViewPage<TModel>
    {
        protected WebViewPage()
        {
            CMS = new Helper.CmsHelper(() => Html);
        }
        
        // ReSharper disable InconsistentNaming
        public Helper.CmsHelper CMS { get; protected set; }
        // ReSharper restore InconsistentNaming
    }
}