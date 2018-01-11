namespace AFT.WebCore.Dtos.Announcement
{
    public class GetLatestAnnouncementResponse : ApiResponse
    {
        public AnnouncementModel Announcement { get; set; }
    }
}