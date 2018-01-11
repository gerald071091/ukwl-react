namespace AFT.WebCore.Dtos.Announcement
{
    public class GetMobileAnnouncementsResponse : ApiResponse
    {
        public AnnouncementModel[] Announcements { get; set; }
        public int TotalNumber { get; set; }
    }
}