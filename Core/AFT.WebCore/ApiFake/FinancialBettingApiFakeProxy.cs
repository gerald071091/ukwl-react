using System;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class FinancialBettingApiFakeProxy : IFinancialBettingApiProxy
    {
        public Uri GetSpotOptionUrl(string cultureCode, string ipAddress)
        {
            throw new NotImplementedException();
        }
    }
}
