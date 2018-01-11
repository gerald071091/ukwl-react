using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Exceptions;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Payment;
using AFT.WebCore.Utils;

using PaymentDto = AFT.RegoApi.Proxy.Dtos.PaymentDto;

namespace AFT.WebCore.Api
{
    public partial class PaymentController
    {
        /// <summary>
        /// Deposit Payment by credit card (World Pay)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("worldpay/deposit")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.WorldPay.DepositResponse DepositByWorldPay([FromBody]Dtos.Payment.PaymentDto.WorldPay.DepositRequest request)
        {
            Log.Info("Depositing by WorldPay");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.WorldPay)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.WorldPay.DepositResponse { Code = validationResult.Value };
            }

            try
            {
                var deposit = _paymentApiProxy.DepositByWorldPay(CultureCode, _userContext.UserId,
                    new PaymentDto.WorldPay.Deposit
                    {
                        CardHolderName = request.CardHolderName,
                        CardType = request.CardType.ToString(),
                        CardNumber = request.CardNumber,
                        Amount = request.Amount,
                        ExpireYear = request.ExpiryYear,
                        ExpireMonth = request.ExpiryMonth,
                        Cvv = request.Cvv,
                        BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                        ProductId = ProductMapping.Mappings[request.Product],
                        SendTerms = request.EmailTerms,
                        DepositUrl = request.DepositUrl,
                        CasinoUrl = request.CasinoUrl,
                        CallbackUrl = request.CallbackUrl,
                        IPAddress = _networkUtility.GetClientIPAddress(),
                        isMobile = request.isMobile
                    });

                return deposit.Pending3DSecure
                    ? new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                    {
                        Code = ResponseCode.Pending3DSecure,
                        PaymentAuthenticationRequest = deposit.PaymentAuthenticationRequest,
                        TransactionId = deposit.TransactionId,
                        VerificationUrl = deposit.VerificationUrl,
                    }
                    : new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                    {
                        Code = ResponseCode.Success,
                        Payment = new PaymentModel
                        {
                            ReferenceNumber = deposit.TrackingNumber,
                            Amount = deposit.DepositAmount,
                            Balance = deposit.CurrentBalance,
                            BonusResult = deposit.BonusResult == null
                                ? null
                                : new PaymentModel.BonusResultModel
                                {
                                    ErrorCode = deposit.BonusResult.ErrorCode,
                                    ErrorDetails = deposit.BonusResult.ErrorDetails,
                                    TransactionCode = deposit.BonusResult.TransactionCode,
                                    TransferResults = deposit.BonusResult.TransferResults
                                },
                        }
                    };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to deposit by WorldPay", ex);

                return new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Withdrawal  (World Pay)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("worldpay/withdraw")]
        [HttpPost]
        public ApiResponse WithdrawByWorldPay([FromBody]Dtos.Payment.PaymentDto.WorldPay.WithdrawalRequest request)
        {
            Log.Info("Withdrawing by WorldPay");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.WorldPay)
                    .ValidateWithdraw(request);

            if (validationResult.HasValue)
            {
                return new ApiResponse { Code = validationResult.Value };
            }

            try
            {
                _paymentApiProxy.WithdrawByWorldPay(CultureCode, _userContext.UserId, new PaymentDto.WorldPay.Withdrawal
                {
                    AccountName = request.CardHolderName,
                    CardType = request.CardType,
                    Amount = request.Amount,
                    Cvv = request.Cvv,
                    EncryptedCardNumber = request.EncryptedCardNumber,
                    ExpiryMonth = request.ExpiryMonth,
                    ExpiryYear = request.ExpiryYear,
                    IPAddress = _networkUtility.GetClientIPAddress(),
                });

                return new ApiResponse { Code = ResponseCode.Success };
            }
            catch (WithdrawalNotCompletedException ex)
            {
                Log.Error("Failed to withdraw by WorldPay", ex);
                return new ApiResponse { Code = ResponseCode.WithdrawalNotCompleted, ErrorMessage = ex.Message };
            }
        }

        /// <summary>
        /// Represents the reset credit card
        /// </summary>
        [Route("worldpay/reset")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.WorldPay.ResetCardResponse ResetWorldPayCreditCardConfirm()
        {
            Log.Info("Reset world pay credit card details");

            try
            {
                var detail = _paymentApiProxy.ResetWorldpayCreditCard(CultureCode, _userContext.UserId);

                return new Dtos.Payment.PaymentDto.WorldPay.ResetCardResponse
                {
                    Code = ResponseCode.Success,
                    Msg = detail.Message
                };
            }
            catch (CurrentPaymentMethodException ex)
            {
                Log.Error("Failed to reset world pay credit card", ex);

                return new Dtos.Payment.PaymentDto.WorldPay.ResetCardResponse
                {
                    Code = ResponseCode.WorldPayResetError,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Returns list of cards information that payer'd used to deposit before
        /// </summary>
        /// <returns></returns>
        [Route("worldpay/details")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.WorldPay.AccountDetailResponse GetWorldPayAccountDetail()
        {
            Log.Info("Getting WorldPay account detail.");

            var detail = _paymentApiProxy.GetWorldPayAccountDetail(CultureCode, _userContext.UserId);

            if (detail == null)
            {
                return new Dtos.Payment.PaymentDto.WorldPay.AccountDetailResponse
                {
                    Code = ResponseCode.AccountDetailNotFound
                };
            }

            var res = new Dtos.Payment.PaymentDto.WorldPay.AccountDetailResponse
            {
                Code = ResponseCode.Success,
                CardHolderName = detail.AccountName,
                Cards = detail.Cards.Select(x => new Dtos.Payment.PaymentDto.WorldPay.CreditCardModel
                {
                    CardNumber = x.CardNumber,
                    EncryptedCardNumber = x.EncryptedCardNumber,
                    Selected = x.Selected
                }).ToList()
            };
            return res;
        }

        /// <summary>
        /// Returns the details of player's fast pay card information
        /// </summary>
        [Route("worldpay/getfastpayinfo")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.WorldPay.FastPayCardInfoResponse GetWorldPayFastPayCardInfo()
        {
            try
            {
                Log.Info("Getting WorldPay Fast pay card detail.");

                var detail = _paymentApiProxy.GetWorldPayFastPayCardInfo(CultureCode, _userContext.UserId);

                if (detail.PlayerId != null)
                {
                    return new Dtos.Payment.PaymentDto.WorldPay.FastPayCardInfoResponse
                    {
                        Code = ResponseCode.Success,
                        PlayerId = detail.PlayerId,
                        ExpirationMessage = detail.ExpirationMessage,
                        CardNumber = detail.CardNumber,
                        Amount = detail.Amount
                    };
                }

                return new Dtos.Payment.PaymentDto.WorldPay.FastPayCardInfoResponse { Code = ResponseCode.WorldPayDepositWithNoFastPay };      
            }
            catch (GetFastPayCardInfoException ex)
            {
                Log.Error("Failed to Get world pay fast pay card info", ex);

                return new Dtos.Payment.PaymentDto.WorldPay.FastPayCardInfoResponse
                {
                    Code = ResponseCode.WorldPayFastPayCardInfoError,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Deposit Payment by fast pay card (World Pay)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("worldpay/depositbyfastpay")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.WorldPay.DepositResponse DepositUsingWorldPayFastPayCard([FromBody]Dtos.Payment.PaymentDto.WorldPay.FastPayRequest request)
        {

            Log.Info("Depositing by WorldPay FastPay");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.WorldPay)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.WorldPay.DepositResponse { Code = validationResult.Value };
            }

            try
            {
                Log.Info("Deposit Using WorldPay Fast pay card.");

                var deposit = _paymentApiProxy.DepositByWorldPayFastPay(CultureCode, new PaymentDto.WorldPay.FastPay
                {
                    PlayerId = request.PlayerId,
                    Amount = request.Amount,
                    BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                    GameId = ProductMapping.Mappings[request.Product],
                    Cvv = request.Cvv,
                    NeedSendBonusTerms = request.SendTerms,
                    IPAddress = _networkUtility.GetClientIPAddress(),
                    DepositUrl = request.DepositUrl,
                    CasinoUrl = request.CasinoUrl,
                    CallBackUrl = request.CallBackUrl,
                    IsMobile = request.IsMobile,
                    Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform
                });

                return deposit.Pending3DSecure
                    ? new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                    {
                        Code = ResponseCode.Pending3DSecure,
                        PaymentAuthenticationRequest = deposit.PaymentAuthenticationRequest,
                        TransactionId = deposit.TransactionId,
                        VerificationUrl = deposit.VerificationUrl,
                    }
                    : new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                    {
                        Code = ResponseCode.Success,
                        Payment = new PaymentModel
                        {
                            ReferenceNumber = deposit.TrackingNumber,
                            Amount = deposit.DepositAmount,
                            Balance = deposit.CurrentBalance,
                            BonusResult = deposit.BonusResult == null
                                ? null
                                : new PaymentModel.BonusResultModel
                                {
                                    ErrorCode = deposit.BonusResult.ErrorCode,
                                    ErrorDetails = deposit.BonusResult.ErrorDetails,
                                    TransactionCode = deposit.BonusResult.TransactionCode,
                                    TransferResults = deposit.BonusResult.TransferResults
                                },
                        }
                    };
            }
            catch (FastPayNotCompletedException ex)
            {
                Log.Error("Failed to Deposit world pay using fast pay card info", ex);

                return new Dtos.Payment.PaymentDto.WorldPay.DepositResponse
                {
                    Code = ResponseCode.WorldPayDepositFastPayCardError,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}