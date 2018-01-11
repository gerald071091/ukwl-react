namespace AFT.WebCore.Dtos.Account
{
    public class LogInRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public bool IsMobile { get; set; }

        public string RememberMe { get; set; }

        public string Token { get; set; }

        public string Platform { get; set; }

        // IOVATION
        public string IovationBlackBox { get; set; }

        public string FirstPartyBlackBox { get; set; }
    }
}