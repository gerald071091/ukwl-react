using System;

namespace AFT.WebCore.Dtos.Account
{
    public class LogInResponse : ApiResponse
    {
        public bool HasReadTerms { get; set; }

        public Uri SportsbookUrl { get; set; }

        public string Token { get; set; }

        public string ExpirationMessageRG { get; set; }
    }
}