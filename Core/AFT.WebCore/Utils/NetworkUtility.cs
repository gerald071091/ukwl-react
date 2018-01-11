using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Web;

namespace AFT.WebCore.Utils
{
    public class NetworkUtility
    {
        private readonly HttpContextBase _httpContextBase;

        public NetworkUtility(HttpContextBase httpContextBase)
        {
            Contract.Requires(httpContextBase != null);

            _httpContextBase = httpContextBase;
        }

        public virtual string GetClientIPAddress()
        {
            try
            {
                string userHostAddress = _httpContextBase.Request.UserHostAddress;

                if (string.IsNullOrWhiteSpace(userHostAddress))
                {
                    return "0.0.0.0";
                }

                IPAddress.Parse(userHostAddress);

                var xForwardedFor = _httpContextBase.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (String.IsNullOrWhiteSpace(xForwardedFor))
                {
                    return userHostAddress;
                }

                var publicForwardingIPs =
                    xForwardedFor.Split(',').Where(ipAddress => !IsPrivateIPAddress(ipAddress.Trim())).ToArray();

                return publicForwardingIPs.Any() ? publicForwardingIPs.Last().Trim() : userHostAddress;
            }
            catch (Exception)
            {
                return "0.0.0.0";
            }
        }

        public virtual string GetServerHost()
        {
            return _httpContextBase.Request.Url == null ? string.Empty : _httpContextBase.Request.Url.Host;
        }

        public virtual string GetRequestUrl()
        {
            return _httpContextBase.Request.Url == null
                ? string.Empty
                : _httpContextBase.Request.Url.GetLeftPart(UriPartial.Authority);
        }

        private static bool IsPrivateIPAddress(string ipAddress)
        {
            // http://en.wikipedia.org/wiki/Private_network
            // Private IP Addresses are:
            //  24-bit block: 10.0.0.0 through 10.255.255.255
            //  20-bit block: 172.16.0.0 through 172.31.255.255
            //  16-bit block: 192.168.0.0 through 192.168.255.255
            //  Link-local addresses: 169.254.0.0 through 169.254.255.255 (http://en.wikipedia.org/wiki/Link-local_address)

            var ip = IPAddress.Parse(ipAddress);
            var octets = ip.GetAddressBytes();

            var is24BitBlock = octets[0] == 10;
            if (is24BitBlock) return true; // Return to prevent further processing

            var is20BitBlock = octets[0] == 172 && octets[1] >= 16 && octets[1] <= 31;
            if (is20BitBlock) return true; // Return to prevent further processing

            var is16BitBlock = octets[0] == 192 && octets[1] == 168;
            if (is16BitBlock) return true; // Return to prevent further processing

            var isLinkLocalAddress = octets[0] == 169 && octets[1] == 254;
            return isLinkLocalAddress;
        }

        /// <summary>
        /// Indicates whether if the user is browsing the site with "preview" mode.
        /// this is done by checking of whether "Preview" Cookie exists.
        /// </summary>
        /// <returns></returns>
        public virtual bool IsViewingDraft()
        {
            var cookie = _httpContextBase.Request.Cookies["Preview"];
            if (cookie == null)
            {
                return false;
            }
            return bool.Parse(cookie.Value);
        }
    }
}