using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Exceptions;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Payment;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;

using PaymentDto = AFT.RegoApi.Proxy.Dtos.PaymentDto;

namespace AFT.WebCore.Api
{
    public partial class PaymentController
    {
        /// <summary>
        ///
        /// </summary>
        /// <returns>
        /// {
        ///     isForbiddenCreditCard: false
        ///     fastPayCardNumber: "424242******4242"
        ///     fastPayId: "987743"
        ///     code: "Success"
        /// }
        /// </returns>
        [Route("raven/fastpay-details")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Raven.FastPayCardResponse GetRavenFastPayCard()
        {
            Log.Info("[" + _userContext.Username + "] Requesting to get Raven FasPay Detail");

            var result = _paymentApiProxy.GetRavenFastPayCard(CultureCode, _userContext.UserId);

            return new Dtos.Payment.PaymentDto.Raven.FastPayCardResponse
            {
                Code = ResponseCode.Success,
                CardNumber = result.CardNumber,
                Id = result.Id,
                Forbidden = result.Forbidden
            };
        }

        [Route("raven/deposit")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Raven.FastDepositResponse DepositByRaven([FromBody] Dtos.Payment.PaymentDto.Raven.DepositReuest request)
        {
            Log.Info("Depositing by Raven");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Raven)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse { Code = validationResult.Value };
            }

            try
            {
                var deposit = new PaymentDto.Raven.Deposit
                {
                    CardHolderName = request.CardHolderName,
                    Amount = request.Amount,
                    CardType = request.CardType,
                    CardNumber = request.CardNumber,
                    Cvv = request.Cvv,
                    ExpiryMonth = request.ExpiryMonth,
                    ExpiryYear = request.ExpiryYear,
                    CasinoUrl = request.CasinoUrl,
                    DepositUrl = request.DepositUrl,
                    CallBackUrl = request.CallbackUrl,
                    BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                    ProductId = ProductMapping.Mappings[request.Product],
                    SendTerms = request.SendTerms,
                    IPAddress = _networkUtility.GetClientIPAddress(),
                    Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform
                };

                var depositResult = _paymentApiProxy.DepositByRaven(CultureCode, _userContext.UserId, deposit);

                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse
                {
                    Code = ResponseCode.Pending3DSecure,
                    PaymentAuthenticationRequest = depositResult.PaymentAuthenticationRequest,
                    VerificationUrl = depositResult.VerificationUrl,
                    TransactionId = depositResult.TransactionId
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to deposit by Raven", ex);
                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("raven/fastpay-deposit")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Raven.FastDepositResponse DepositByRavenFastPay([FromBody] Dtos.Payment.PaymentDto.Raven.FastDepositReuest request)
        {
            Log.Info("Depositing by Raven fast pay");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Raven)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse { Code = validationResult.Value };
            }

            var deposit = new PaymentDto.Raven.FastPayDeposit
            {
                Id = request.Id,
                Amount = request.Amount,
                CardNumber = request.CardNumber,
                CallBackUrl = request.CallbackUrl,
                CasinoUrl = request.CasinoUrl,
                DepositUrl = request.DepositUrl,
                BonusCode = request.BonusCode,
                ProductId = ProductMapping.Mappings[request.Product],
                IPAddress = _networkUtility.GetClientIPAddress(),
                Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform
            };

            try
            {
                var depositResult = _paymentApiProxy.DepositByRavenFastPay(CultureCode, _userContext.UserId, deposit);

                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse
                {
                    Code = ResponseCode.Pending3DSecure,
                    PaymentAuthenticationRequest = depositResult.PaymentAuthenticationRequest,
                    VerificationUrl = depositResult.VerificationUrl,
                    TransactionId = depositResult.TransactionId
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to deposit by Raven fast pay", ex);
                return new Dtos.Payment.PaymentDto.Raven.FastDepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("~/{culture}/raven/callback")]
        [Route("~/{culture}/mobile/raven/callback")]
        [AllowAnonymous]
        [SuppressCsrfProtection]
        [HttpPost]
        public HttpResponseMessage SendRavenDepositStatus([FromBody] FormDataCollection collection)
        {
            Log.InfoFormat("Sending Raven deposit status.\n{0}",
                collection == null ? string.Empty : string.Join(", ", collection));

            try
            {
                var depositUrl =
                    new Uri(string.Format("{0}/{1}/{2}", _networkUtility.GetRequestUrl(), CultureCode,
                        _configurations.DepositPath));

                var casinoUrl =
                    new Uri(string.Format("{0}/{1}/{2}", _networkUtility.GetRequestUrl(), CultureCode,
                        _configurations.CasinoPath));

                _paymentApiProxy.ConfirmDepositByRaven(CultureCode, _userContext.UserId,
                    new PaymentDto.Raven.Confirmation
                    {
                        CasinoUrl = casinoUrl.AbsoluteUri,
                        DepositUrl = depositUrl.AbsoluteUri,
                        TransactionId = collection["MD"],
                        PaymentAuthenticationResponse = collection["PARes"]
                    });
            }
            catch (DepositNotificationNotSentException ex)
            {
                Log.Error("Failed to send Raven deposit status", ex);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Route("raven/confirm-deposit")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Raven.DepositConfirmResponse RavenDepositConfirm([FromBody]Dtos.Payment.PaymentDto.Raven.DepositConfirmRequest request)
        {
            Log.Info("[" + _userContext.Username + "] Requesting for Raven deposit confirmation");

            var payload = new PaymentDto.Raven.Confirmation
            {
                CasinoUrl = request.CasinoUrl,
                DepositUrl = request.DepositUrl,
                PaymentAuthenticationResponse = request.PaymentAuthenticationResponse,
                TransactionId = request.TrasactionId
            };

            var deposit = _paymentApiProxy.ConfirmDepositByRaven(CultureCode, _userContext.UserId, payload);

            return new Dtos.Payment.PaymentDto.Raven.DepositConfirmResponse
            {
                Code = ResponseCode.Success,
                Message = deposit.Message,
                Payment =
                    new PaymentModel
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
                                }
                    }
            };
        }

        [Route("raven/withdraw")]
        [HttpPost]
        public ApiResponse WithdrawByRaven([FromBody] Dtos.Payment.PaymentDto.Raven.WithdrawalRequest request)
        {
            Log.Info("Withdrawing by Raven");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Raven)
                    .ValidateWithdraw(request);

            if (validationResult.HasValue)
            {
                return new ApiResponse { Code = validationResult.Value };
            }

            try
            {
                var payload = new PaymentDto.Raven.Withdrawal
                {
                    CardNumber = request.CardNumber,
                    Cvv = request.Cvv,
                    ExpiryYear = request.ExpiryYear,
                    ExpiryMonth = request.ExpiryMonth,
                    Amount = request.Amount,
                    IPAddress = _networkUtility.GetClientIPAddress(),
                };

                _paymentApiProxy.WithdrawByRaven(CultureCode, _userContext.UserId, payload);

                return new ApiResponse
                {
                    Code = ResponseCode.Success
                };
            }
            catch (WithdrawalNotCompletedException ex)
            {
                Log.Error("Failed to withdraw by Raven", ex);

                return new Dtos.Payment.PaymentDto.Raven.WithdrawalResponse
                {
                    Code = ResponseCode.WithdrawalNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Returns list of cards information that payer'd used to deposit before
        /// </summary>
        /// <returns></returns>
        [Route("raven/details")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Raven.AccountDetailResponse GetRavenAccountDetail()
        {
            Log.Info("Getting Raven account detail.");

            var detail = _paymentApiProxy.GetRavenAccountDetail(CultureCode, _userContext.UserId);

            if (detail == null)
            {
                return new Dtos.Payment.PaymentDto.Raven.AccountDetailResponse
                {
                    Code = ResponseCode.AccountDetailNotFound
                };
            }

            var res = new Dtos.Payment.PaymentDto.Raven.AccountDetailResponse
            {
                Code = ResponseCode.Success,
                CardHolderName = detail.AccountName,
                Cards = detail.Cards.Select(x => new Dtos.Payment.PaymentDto.Raven.CreditCardModel
                {
                    CardNumber = x.CardNumber,
                    EncryptedCardNumber = x.EncryptedCardNumber,
                    Selected = x.Selected
                }).ToList()
            };
            return res;
        }

        /// <summary>
        /// Represents the reset credit card
        /// </summary>
        [Route("raven/reset")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Raven.ResetCardResponse ResetRavenCreditCardConfirm()
        {
            Log.Info("Reset raven credit card details");

            try
            {
                var detail = _paymentApiProxy.ResetRavenCreditCard(CultureCode, _userContext.UserId);

                return new Dtos.Payment.PaymentDto.Raven.ResetCardResponse
                {
                    Code = ResponseCode.Success,
                    Msg = detail.Message
                };
            }
            catch (CurrentPaymentMethodException ex)
            {
                Log.Error("Failed to reset raven credit card", ex);

                return new Dtos.Payment.PaymentDto.Raven.ResetCardResponse
                {
                    Code = ResponseCode.RavenResetError,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}