using System.ComponentModel.DataAnnotations;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        public class Ukash
        {
            public class ActivateUkashVoucherRequest
            {
                [Required]
                public string Code { get; set; }

                [Required]
                public string Username { get; set; }

                [Required]
                public string Password { get; set; }
            }

            public class ActivateUkashVoucherResponse : ApiResponse
            {
                public VoucherModel Voucher { get; set; }

                public class VoucherModel
                {
                    public string Number { get; set; }

                    public string Value { get; set; }

                    public string Currency { get; set; }

                    public string ExpiryDate { get; set; }

                    public string ActivationDate { get; set; }
                }
            }

            public class DepositReuest : DepositBaseRequest
            {
                public string VoucherNumber { get; set; }

                public string VoucherValue { get; set; }

                public string DepositUrl { get; set; }

                public string CasinoUrl { get; set; }
            }

            public class DepositResponse : ApiResponse
            {
                public PaymentModel Payment { get; set; }

                public UkashDepositReturn DepositResult { get; set; }

                public class UkashDepositReturn
                {
                    public int TransferResult { get; set; }

                    public string TrackingNumber { get; set; }

                    public decimal Amount { get; set; }

                    public string ErrorCode { get; set; }

                    public string ChangeVoucherNumber { get; set; }

                    public string ChangeVoucherValue { get; set; }

                    public string ChangeVoucherCurrency { get; set; }

                    public string ChangeVoucherExpiryDate { get; set; }

                    public string TransactionStatusReturn { get; set; }

                    public string TransactionId { get; set; }

                    public string TransactionCurrency { get; set; }

                    public decimal CurrentAmount { get; set; }
                }
            }

            public class WithdrawalReuest : WithdrawalBaseRequest
            {
            }

            public class WithdrawalResponse : ApiResponse
            {
                public UkashWithdrawTransferResult UkashWithdrawReturn { get; set; }

                public string TrackingNumber { get; set; }

                public class UkashWithdrawTransferResult
                {
                    public int TransferResult { get; set; }

                    public string TrackingNumber { get; set; }

                    public string ErrorCode { get; set; }

                    public string IssueVoucherNumber { get; set; }

                    public string IssueVoucherValue { get; set; }

                    public string IssueVoucherCurrency { get; set; }

                    public string IssueVoucherExpiryDate { get; set; }
                }
            }
        }
    }
}