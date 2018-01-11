using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        #region WorldPay

        public class WorldPay
        {
            public class DepositRequest : DepositBaseRequest
            {
                public enum CreditCardType
                {
                    CreditCard = 0,
                    DebitCard = 1
                }

                /// <summary>
                /// The type of the card
                /// </summary>
                [Required]
                public CreditCardType CardType { get; set; }

                [Required]
                public string CardNumber { get; set; }

                [Required]
                public string CardHolderName { get; set; }

                [Required]
                public string ExpiryYear { get; set; }

                [Required]
                public string ExpiryMonth { get; set; }

                /// <summary>
                /// CVV2 security code of the credit card
                /// </summary>
                [Required]
                public string Cvv { get; set; }

                /// <summary>
                /// must be true if BonusCode is provided
                /// </summary>
                public bool AgreedToTerms { get; set; }

                /// <summary>
                /// If terms and conditons are to be emailed to user
                /// </summary>
                public bool EmailTerms { get; set; }

                /// <summary>
                /// The deposit url to be included in email confirmation
                /// </summary>
                [Required]
                public string DepositUrl { get; set; }

                /// <summary>
                /// The casino url to be included in email confirmation
                /// </summary>
                [Required]
                public string CasinoUrl { get; set; }

                public string CallbackUrl { get; set; }

                public string isMobile { get; set; } 
            }

            public class DepositResponse : ApiResponse
            {
                public PaymentModel Payment { get; set; }

                public string PaymentAuthenticationRequest { get; set; }

                public string VerificationUrl { get; set; }

                public string TransactionId { get; set; }
            }

            public class WithdrawalRequest : WithdrawalBaseRequest
            {
                /// <summary>
                /// Send Encrypted card number
                /// </summary>
                [Required]
                public string EncryptedCardNumber { get; set; }

                [Required]
                public string CardType { get; set; }

                [Required]
                public string CardHolderName { get; set; }

                [Required]
                public string ExpiryYear { get; set; }

                [Required]
                public string ExpiryMonth { get; set; }

                [Required]
                public string Cvv { get; set; }
            }

            /// <summary>
            /// Represents the world pay user with a list of his credit cards available
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
            /// TODO: integrate with domain [AS equivlent to AFT.RegoCMS.Domain.Services.Payment.Data.WorldPayCardList]
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

            public class FastPayCardInfoResponse : ApiResponse
            {
                public string PlayerId { get; set; }
                public string ExpirationMessage { get; set; }
                public string CardNumber { get; set; }
                public decimal Amount { get; set; }
            }

            public class FastPayRequest : DepositBaseRequest
            {
                public string PlayerId { get; set; }
                public string Cvv { get; set; }
                public string DepositUrl { get; set; }
                public string CasinoUrl { get; set; }
                public string CallBackUrl { get; set; }
                public string IsMobile { get; set; }
                public string Platform { get; set; }
            }
        }

        #endregion WorldPay
    }
}