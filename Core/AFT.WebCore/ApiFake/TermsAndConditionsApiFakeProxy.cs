using System;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class TermsAndConditionsApiFakeProxy : ITermsAndConditionsApiProxy
    {
        public void Accept(string cultureCode, Guid userId)
        {
            //throw new NotImplementedException();
        }

        public bool HasReadTheLatest(string cultureCode, Guid userId)
        {
            //throw new NotImplementedException();
            return true;
        }
    }
}
