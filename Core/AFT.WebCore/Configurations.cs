using System.Configuration;
using System.Diagnostics.CodeAnalysis;

namespace AFT.WebCore
{
    [ExcludeFromCodeCoverage]
    public class Configurations
    {
        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string CrossSiteAuthCookieName
        {
            get
            {
                string crossSiteAuthCookieName = ConfigurationManager.AppSettings["CrossSiteAuthCookieName"];

                if (string.IsNullOrWhiteSpace(crossSiteAuthCookieName))
                {
                    throw new ConfigurationErrorsException("CrossSiteAuthCookieName not found.");
                }

                return crossSiteAuthCookieName;
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string TicketKey
        {
            get
            {
                string ticketKey = ConfigurationManager.AppSettings["TicketKey"];

                if (string.IsNullOrWhiteSpace(ticketKey))
                {
                    throw new ConfigurationErrorsException("TicketKey not found.");
                }

                return ticketKey;
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string TicketHashKey
        {
            get
            {
                string ticketHashKey = ConfigurationManager.AppSettings["TicketHashKey"];

                if (string.IsNullOrWhiteSpace(ticketHashKey))
                {
                    throw new ConfigurationErrorsException("TicketHashKey not found.");
                }

                return ticketHashKey;
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string DepositPath
        {
            get
            {
                string depositPath = ConfigurationManager.AppSettings["DepositPath"];

                if (string.IsNullOrWhiteSpace(depositPath))
                {
                    throw new ConfigurationErrorsException("DepositPath not found.");
                }

                return depositPath.TrimStart('/');
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string CasinoPath
        {
            get
            {
                string casinoPath = ConfigurationManager.AppSettings["CasinoPath"];

                if (string.IsNullOrWhiteSpace(casinoPath))
                {
                    throw new ConfigurationErrorsException("CasinoPath not found.");
                }

                return casinoPath.TrimStart('/');
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string ErrorPagePath
        {
            get
            {
                string errorPagePath = ConfigurationManager.AppSettings["ErrorPagePath"];

                if (string.IsNullOrWhiteSpace(errorPagePath))
                {
                    throw new ConfigurationErrorsException("ErrorPagePath not found.");
                }

                return errorPagePath.TrimStart('/');
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string AccessRestrictedPath
        {
            get
            {
                string accessRestrictedPath = ConfigurationManager.AppSettings["AccessRestrictedPath"];

                if (string.IsNullOrWhiteSpace(accessRestrictedPath))
                {
                    throw new ConfigurationErrorsException("AccessRestrictedPath not found.");
                }

                return accessRestrictedPath.TrimStart('/');
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string MobileDevice
        {
            get
            {
                string mobileDevice = ConfigurationManager.AppSettings["MobileDevice"];

                if (string.IsNullOrWhiteSpace(mobileDevice))
                {
                    throw new ConfigurationErrorsException("MobileDevice not found.");
                }

                return mobileDevice;
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string MobileModal
        {
            get
            {
                string mobileModal = ConfigurationManager.AppSettings["MobileModal"];

                if (string.IsNullOrWhiteSpace(mobileModal))
                {
                    throw new ConfigurationErrorsException("MobileModal not found.");
                }

                return mobileModal;
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public virtual string DefaultDomain
        {
            get
            {
                string defaultDomain = ConfigurationManager.AppSettings["DefaultDomain"];

                if (string.IsNullOrWhiteSpace(defaultDomain))
                {
                    throw new ConfigurationErrorsException("DefaultDomain not found.");
                }

                return defaultDomain.TrimEnd('/');
            }
        }
    }
}