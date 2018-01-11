using System.Diagnostics.CodeAnalysis;
using System.Web.Security;

namespace AFT.WebCore
{
    [ExcludeFromCodeCoverage]
    public class FormsAuthentication
    {
        public virtual void SignOut()
        {
            System.Web.Security.FormsAuthentication.SignOut();
        }

        public virtual string FormsCookieName
        {
            get { return System.Web.Security.FormsAuthentication.FormsCookieName; }
        }

        public virtual FormsAuthenticationTicket Decrypt(string encryptedTicket)
        {
            return System.Web.Security.FormsAuthentication.Decrypt(encryptedTicket);
        }

        public virtual string Encrypt(FormsAuthenticationTicket ticket)
        {
            return System.Web.Security.FormsAuthentication.Encrypt(ticket);
        }

        public virtual void SetAuthCookie(string username)
        {
            System.Web.Security.FormsAuthentication.SetAuthCookie(username, true);
        }
    }
}