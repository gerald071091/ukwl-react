using System;
using System.Diagnostics.Contracts;
using System.Web;

using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.WebCore
{
    public class RegoSessionIdentity : IRegoIdentity
    {
        private readonly HttpContextBase _httpContextBase;

        public RegoSessionIdentity(HttpContextBase httpContextBase)
        {
            Contract.Requires(httpContextBase != null);

            _httpContextBase = httpContextBase;
        }

        public void Save(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return;
            }

            if (_httpContextBase == null || _httpContextBase.Session == null)
            {
                throw new InvalidOperationException("HttpContext or session is null.");
            }

            _httpContextBase.Session["rego"] = token;
        }

        public string Token
        {
            get
            {
                if (_httpContextBase == null || _httpContextBase.Session == null)
                {
                    return string.Empty;
                }

                var rego = _httpContextBase.Session["rego"];

                return rego == null ? string.Empty : rego.ToString();
            }
        }
    }
}