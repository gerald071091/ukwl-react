using System;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    
    public class AnnouncementApiFakeProxy : IAnnouncementApiProxy
    {
        public RegoApi.Proxy.Dtos.AnnouncementDto GetLatestAnnouncement(string cultureCode)
        {
            throw new NotImplementedException();
        }

        public System.Collections.ObjectModel.ReadOnlyCollection<RegoApi.Proxy.Dtos.AnnouncementDto> GetMobileAnnouncements(string cultureCode)
        {
            throw new NotImplementedException();
        }
    }
}
