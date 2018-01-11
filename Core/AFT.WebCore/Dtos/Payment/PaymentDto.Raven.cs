using System.Collections.Generic;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        public class Raven
        {
            public class DepositReuest : DepositBaseRequest
            {
                public string CardHolderName { get; set; }

                public string CallbackUrl { get; set; }

                public string CardNumber { get; set; }

                public string CardType { get; set; }

                public string CasinoUrl { get; set; }

                public string Cvv { get; set; }

                public string DepositUrl { get; set; }

                public string ExpiryMonth { get; set; }

                public string ExpiryYear { get; set; }

                public string Platform { get; set; }
            }

            public class FastDepositReuest : DepositBaseRequest
            {
                public string CallbackUrl { get; set; }

                public string CardNumber { get; set; }

                public string CasinoUrl { get; set; }

                public string DepositUrl { get; set; }

                public string Id { get; set; }

                public string Platform { get; set; }
            }

            public class FastDepositResponse : ApiResponse
            {
                //public FastDepositResult DepositResult { get; set; }

                public string PaymentAuthenticationRequest { get; set; }

                public string VerificationUrl { get; set; }

                //public string VerificationUrl { get; set; }

                //public string PaymentAuthenticationRequest { get; set; }

                public string TransactionId { get; set; }

                //public class FastDepositResult
                //{
                //    public int TransferResult { get; set; }

                //    public string TrackingNumber { get; set; }

                //    public string ErrorCode { get; set; }

                //    public string FundInResult { get; set; }

                //    public decimal Amount { get; set; }

                //    public decimal CurrentAmount { get; set; }

                //    public string ErrorExplain { get; set; }
                //}
            }

            public class FastPayCardResponse : ApiResponse
            {
                public bool Forbidden { get; set; }

                public string CardNumber { get; set; }

                public string Id { get; set; }
            }

            public class DepositConfirmRequest
            {
                public string CasinoUrl { get; set; }

                public string DepositUrl { get; set; }

                public string PaymentAuthenticationResponse { get; set; }

                public string TrasactionId { get; set; }
            }

            public class DepositConfirmResponse : ApiResponse
            {
                public PaymentModel Payment { get; set; }
            }

            public class WithdrawalRequest : WithdrawalBaseRequest
            {
                public string CardNumber { get; set; }

                public string Cvv { get; set; }

                public string ExpiryMonth { get; set; }

                public string ExpiryYear { get; set; }
            }

            public class WithdrawalResponse : ApiResponse
            {
            }

            /// <summary>
            /// Represents the raven user with a list of his credit cards available
            /// </summary>
            public class AccountDetailResponse : ApiResponse
            {
                public string CardHolderName { get; set; }

                public List<CreditCardModel> Cards { get; set; }
            }

            /// <summary>
            /// Represents the reset credit card notify
            /// </summary>
            public class ResetCardResponse : ApiResponse
            {
                public string Msg { get; set; }
            }

            /// <summary>
            /// The credit card of the player who's used to deposit before
            /// </summary>
            public class CreditCardModel
            {
                public bool Selected { get; set; }

                public string CardNumber { get; set; }

                /// <summary>
                /// Encryped credit card number
                /// Used for withdrawal's CardNumber
                /// </summary>
                public string EncryptedCardNumber { get; set; }
            }
        }
    }
}