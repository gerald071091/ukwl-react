using System;
using System.ComponentModel.DataAnnotations;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        public class Skrill
        {
            public class DepositRequest : DepositBaseRequest
            {
                [Required]
                public Uri ReturnUrlPrefix { get; set; }

                public string IPAddress { get; set; }

                public string Platform { get; set; }
            }

            public class OneTapRequest : DepositBaseRequest
            {
                public string CmsDomain { get; set; }

                public int GameId { get; set; }

                public string Platform { get; set; }
            }

            public class DepositResponse : ApiResponse
            {
                public Uri Url { get; set; }

                public FundInResult BonusResult { get; set; }

                public class FundInResult
                {
                    /// <summary>
                    /// Transaction id
                    /// </summary>
                    /// <example>E00000001</example>
                    public string TransactionCode { get; set; }

                    /// <summary>
                    /// Error code is "" when success
                    /// </summary>
                    /// <example>F0019</example>
                    public string ErrorCode { get; set; }

                    /// <summary>
                    /// 1: Fail
                    /// 2: Success
                    /// </summary>
                    public int TransferResults { get; set; }

                    /// <summary>
                    /// Error message from API
                    /// "Invalid bonus code for the wallet selected, please try again."
                    /// </summary>
                    public string ErrorDetails { get; set; }
                }
            }

            public class WithdrawalReuest : WithdrawalBaseRequest
            {
                public string Email { get; set; }
            }

            public class WithdrawalResponse : ApiResponse
            {
                public decimal? Balance { get; set; }
            }

            public class GetSkrillDepositStatusReuest
            {
                public string TransactionId { get; set; }

                public int Try { get; set; }

                public int MaximumTry { get; set; }
            }

            public class GetSkrillDepositStatusResponse : ApiResponse
            {
                public bool Completed { get; set; }

                public bool Succeeded { get; set; }

                public PaymentModel Payment { get; set; }
            }

            public class GetAccountDetailResponse : ApiResponse
            {
                public string Email { get; set; }
            }

            public class OneTapDepositResponse : ApiResponse
            {
                public string Url { get; set; }

                public bool IsCompleted { get; set; }

                public bool IsSuccess { get; set; }

                public string ErrorCode { get; set; }

                public string ReferenceNumber { get; set; }

                public decimal Amount { get; set; }

                public decimal Balance { get; set; }
            }
        }
    }
}