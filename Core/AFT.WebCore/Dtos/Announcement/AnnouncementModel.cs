using System;

namespace AFT.WebCore.Dtos.Announcement
{
    public class AnnouncementModel
    {
        public DateTime? Date { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }
    }
}