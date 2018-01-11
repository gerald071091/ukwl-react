using System.ComponentModel.DataAnnotations;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        #region Neteller

        public class Neteller
        {
            public class DepositRequest : DepositBaseRequest
            {
                /// <summary>
                /// Netteller account Id that should be provided by user
                /// </summary>
                [Required]
                public string AccountId { get; set; }

                /// <summary>
                /// Netteller secure Id that should be provided by user
                /// </summary>
                [Required]
                public string SecureId { get; set; }

                /// <summary>
                /// The Deposit URL of the site that will be sent in confirmation email as a clickable link
                /// </summary>
                [Required]
                public string DepositUrl { get; set; }

                /// <summary>
                /// The Casino URL of the site that will be sent in confirmation email as a clickable link
                /// </summary>
                [Required]
                public string CasinoUrl { get; set; }

                /// <summary>
                /// The PlatForm used by user to deposit using Neteller account
                /// </summary>
                public string Platform { get; set; }
            }

            public class WithdrawalRequest : WithdrawalBaseRequest
            {
                public string AccountId { get; set; }
            }

            public class GetAccountDetailResponse : ApiResponse
            {
                /// <summary>
                /// The netteller account id of the given user
                /// </summary>
                public string AccountId { get; set; }
            }

            public class DepositResponse : ApiResponse
            {
                public PaymentModel Payment { get; set; }
            }
        }

        #endregion Neteller
    }
}