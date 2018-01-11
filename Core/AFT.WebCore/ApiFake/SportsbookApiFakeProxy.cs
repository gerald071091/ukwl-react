using System;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class SportsbookApiFakeProxy : ISportsbookApiProxy
    {
        public Uri GetSbTechMobileUrl(string cultureCode, string username)
        {
            return new Uri("http://www.afusion.com/");
        }

        public Uri GetSbTechMobileUrl(string cultureCode)
        {
            return new Uri("http://www.afusion.com/");
        }

        public string GetSbTechRefreshSession(string cultureCode)
        {
            throw new NotImplementedException();
        }

        public string GetSbTechRefreshSession(string cultureCode, Guid userId, string currency)
        {
            throw new NotImplementedException();
        }

        public string GetSbTechStatus(string cultureCode)
        {
            throw new NotImplementedException();
        }

        public string GetSbTechStatus(string cultureCode, Guid userId, string username, string currency)
        {
            throw new NotImplementedException();
        }

        public Uri GetSbTechUrl(string cultureCode, string username)
        {
            return new Uri("http://www.afusion.com/");
        }

        public Uri GetSbTechUrl(string cultureCode)
        {
            return new Uri("http://www.afusion.com/");
        }
    }
}
