using System;

namespace AFT.WebCore
{
    public class LoggedInUser
    {
        public Guid UserId { get; set; }

        public string Username { get; set; }

        public string Currency { get; set; }

        public Uri SportsbookUrl { get; set; }
    }
}