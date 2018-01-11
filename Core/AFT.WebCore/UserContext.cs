using System;
using System.Diagnostics;
using System.Diagnostics.Contracts;
using System.Web;

using AFT.RegoApi.Proxy.Exceptions;

namespace AFT.WebCore
{
    public class UserContext
    {
        private readonly HttpContextBase _httpContextBase;
        private readonly FormsAuthentication _formsAuthentication;

        public UserContext(HttpContextBase httpContextBase, FormsAuthentication formsAuthentication)
        {
            Contract.Requires(httpContextBase != null);
            Contract.Requires(formsAuthentication != null);

            _httpContextBase = httpContextBase;
            _formsAuthentication = formsAuthentication;
        }

        public virtual void LogOut()
        {
            if (!LoggedIn)
            {
                return;
            }

            _httpContextBase.Session.Abandon();
            _formsAuthentication.SignOut();
        }

        public virtual bool LoggedIn
        {
            get { return _httpContextBase.Request.IsAuthenticated; }
        }

        public virtual string Currency
        {
            get
            {
                Debug.Assert(_httpContextBase.Session != null);
                return (string)_httpContextBase.Session["Currency"];
            }
            private set
            {
                Debug.Assert(_httpContextBase.Session != null);
                _httpContextBase.Session["Currency"] = value;
            }
        }

        public virtual Guid UserId
        {
            get
            {
                Debug.Assert(_httpContextBase.Session != null);
                return (Guid)_httpContextBase.Session["UserId"];
            }
            private set
            {
                Debug.Assert(_httpContextBase.Session != null);
                _httpContextBase.Session["UserId"] = value;
            }
        }

        public virtual string Username
        {
            get { return _httpContextBase.User.Identity.Name; }
        }

        public virtual string SessionId
        {
            get
            {
                Debug.Assert(_httpContextBase.Session != null);
                return _httpContextBase.Session.SessionID;
            }
        }

        public virtual void Save(LoggedInUser user)
        {
            UserId = user.UserId;
            Currency = user.Currency;
            _formsAuthentication.SetAuthCookie(user.Username);
        }
    }
}