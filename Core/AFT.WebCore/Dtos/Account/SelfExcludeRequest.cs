namespace AFT.WebCore.Dtos.Account
{
    public class SelfExcludeRequest
    {
        public int Days { get; set; }

        public string isCompulsiveGambler { get; set; }

        public string Reason { get; set; }

        public string linkedAccounts { get; set; }
    }
}