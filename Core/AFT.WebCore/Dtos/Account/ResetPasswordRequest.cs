using AFT.RegoApi.Proxy;

namespace AFT.WebCore.Dtos.Account
{
    public class ResetPasswordRequest
    {
        public ResetPasswordType ResetType { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public SecurityQuestion SecurityQuestion { get; set; }

        public string SecurityAnswer { get; set; }
    }

    public enum ResetPasswordType
    {
        Default = 1,
        SecurityQuestion = 2
    }
}