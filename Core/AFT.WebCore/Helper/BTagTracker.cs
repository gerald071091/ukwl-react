using System;
using System.Diagnostics.Contracts;
using System.Web;

namespace AFT.WebCore.Helper
{
    public class BTagTracker
    {
        public const string BTagKey = "btag";
        private readonly HttpContextBase _httpContextBase;

        public BTagTracker(HttpContextBase httpContextBase)
        {
            Contract.Requires(httpContextBase != null);

            _httpContextBase = httpContextBase;
        }

        public void TrackBTag(string key = BTagKey, int expiryDays = 30)
        {
            var queryString = _httpContextBase.Request.QueryString;
            var bTag = queryString[key];

            if (bTag == null)
            {
                return;
            }

            //var cookies = _httpContextBase.Request.Cookies;
            //if (cookies[key] != null)
            //{
            //    return;
            //}

            var bTagCookie = new HttpCookie(key)
            {
                Expires = DateTime.Now.AddDays(expiryDays),
                Value = bTag
            };
            _httpContextBase.Response.Cookies.Add(bTagCookie);
        }

        public string GetBTag(string key = BTagKey)
        {
            var bTag = _httpContextBase.Request.Cookies[key];
            return bTag == null ? string.Empty : bTag.Value;
        }

        public void ClearBTag(string key = BTagKey)
        {
            var cookie = new HttpCookie(key)
            {
                Expires = DateTime.Now.AddDays(-10)
            };
            _httpContextBase.Response.Cookies.Set(cookie);
        }
    }
}
