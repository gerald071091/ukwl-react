using System.Diagnostics.Contracts;
using System.Text.RegularExpressions;
using System.Web;

namespace AFT.WebCore.Utils
{
    public class BrowserUtility
    {
        private readonly HttpContextBase _httpContextBase;
        private readonly Configurations _configurations;

        public BrowserUtility(HttpContextBase httpContextBase, Configurations configurations)
        {
            Contract.Requires(httpContextBase != null);
            Contract.Requires(configurations != null);

            _httpContextBase = httpContextBase;
            _configurations = configurations;
        }

        public virtual bool IsMobile()
        {
            string u = _httpContextBase.Request.ServerVariables["HTTP_USER_AGENT"];
            Regex b =
                new Regex(
                    _configurations.MobileDevice,
                    RegexOptions.IgnoreCase | RegexOptions.Multiline);
            Regex v =
                new Regex(
                    _configurations.MobileModal,
                    RegexOptions.IgnoreCase | RegexOptions.Multiline);
            return ((b.IsMatch(u) || v.IsMatch(u.Substring(0, 4))) &&
                    string.IsNullOrEmpty(_httpContextBase.Request.Params["mob"]));
        }
    }
}