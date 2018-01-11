using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Announcement;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}/announcements")]
    public class AnnouncementController : ApiBase
    {
        #region private field(s)

        private readonly IAnnouncementApiProxy _announcementApiProxy;

        #endregion private field(s)

        public AnnouncementController(IAnnouncementApiProxy announcementApiProxy)
        {
            Contract.Requires(announcementApiProxy != null);
            _announcementApiProxy = announcementApiProxy;
        }

        [Route("latest")]
        [AllowAnonymous]
        [HttpGet]
        public GetLatestAnnouncementResponse GetLatestAnnouncement()
        {
            var announcement = _announcementApiProxy.GetLatestAnnouncement(CultureCode);

            if (announcement == null)
            {
                return new GetLatestAnnouncementResponse { Code = ResponseCode.AnnouncementNotFound };
            }

            return new GetLatestAnnouncementResponse
            {
                Code = ResponseCode.Success,
                Announcement = new AnnouncementModel { Content = announcement.Content }
            };
        }

        [Route("~/mapi/{culture}/announcements")]
        [HttpGet]
        public GetMobileAnnouncementsResponse GetMobileAnnouncements(int page = 1, int pageSize = 10)
        {
            var announcements = _announcementApiProxy.GetMobileAnnouncements(CultureCode);

            return new GetMobileAnnouncementsResponse
            {
                Code = ResponseCode.Success,
                TotalNumber = announcements.Count,
                Announcements = announcements.Skip((page - 1) * pageSize).Take(pageSize).Select(announcement => new AnnouncementModel
                {
                    Date = announcement.Date,
                    Subject = announcement.Subject,
                    Content = announcement.Content
                }).ToArray()
            };
        }
    }
}