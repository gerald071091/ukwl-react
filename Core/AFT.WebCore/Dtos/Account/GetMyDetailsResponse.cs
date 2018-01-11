using System;

namespace AFT.WebCore.Dtos.Account
{
    public class GetMyDetailsResponse : ApiResponse
    {
        public UserModel User { get; set; }

        // Should not be doing this because the token is not sharable between mobile and desktop
        //public Uri SportsbookUrl { get; set; }
        //public Uri SportsbookMobileUrl { get; set; }
    }
}