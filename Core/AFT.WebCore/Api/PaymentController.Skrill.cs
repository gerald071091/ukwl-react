using System;
using System.Collections.Specialized;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading;
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
        [Route("skrill/onetap-deposit"), HttpPost]
        public Dtos.Payment.PaymentDto.Skrill.OneTapDepositResponse OneTapDeposit([FromBody] Dtos.Payment.PaymentDto.Skrill.OneTapRequest request)
        {
            Log.Info("One tap Depositing by Skrill");

            var deposit = new PaymentDto.Skrill.OneTapRequest
            {
                Amount = request.Amount,
                BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                CmsDomain = request.CmsDomain,
                GameId = request.GameId,
                Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform,
                SendTerms = request.SendTerms
            };

            try
            {
                var response = _paymentApiProxy.OneTapDeposit(CultureCode, _userContext.UserId, _networkUtility.GetClientIPAddress(), deposit);

                return new Dtos.Payment.PaymentDto.Skrill.OneTapDepositResponse
                {
                    Code = ResponseCode.Success,
                    Url = response.Url,
                    IsCompleted = response.IsCompleted,
                    IsSuccess = response.IsSuccess,
                    ErrorCode = response.ErrorCode,
                    ReferenceNumber = response.RefNo,
                    Amount = response.Amount,
                    Balance = response.Balance
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to One tap deposit", ex);

                return new Dtos.Payment.PaymentDto.Skrill.OneTapDepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new Dtos.Payment.PaymentDto.Skrill.OneTapDepositResponse
                {
                    Code = ResponseCode.BrokenApiProxy,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Deposit Payment by skrill
        /// </summary>
        /// <returns>
        /// {
        ///     Url: https://www.moneybookers.com/app/payment.pl?sid=51f94184250b4c7c889504ca7ea36b48
        ///     code: "Success"
        /// }
        /// </returns>
        [Route("skrill/deposit-url")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Skrill.DepositResponse GetSkrillDepositUrl([FromUri]Dtos.Payment.PaymentDto.Skrill.DepositRequest request)
        {
            Log.Info("Depositing by Skrill");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Skrill)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Skrill.DepositResponse { Code = validationResult.Value };
            }

            var deposit = new PaymentDto.Skrill.Deposit
            {
                ProductId = ProductMapping.Mappings[request.Product],
                Amount = request.Amount,
                BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                ReturnUrlPrefix = request.ReturnUrlPrefix,
                SendTerms = request.SendTerms,
                IPAddress = _networkUtility.GetClientIPAddress(),
                Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform
            };
            
            try
            {
                var resp = _paymentApiProxy.GetSkrillDepositUrl(CultureCode, _userContext.UserId, deposit);

                return new Dtos.Payment.PaymentDto.Skrill.DepositResponse
                {
                    Code = ResponseCode.Success,
                    Url = resp.Uri,
                    BonusResult = resp.BonusResult == null
                        ? null
                        : new Dtos.Payment.PaymentDto.Skrill.DepositResponse.FundInResult
                        {
                            ErrorCode = resp.BonusResult.ErrorCode,
                            ErrorDetails = resp.BonusResult.ErrorDetails,
                            TransactionCode = resp.BonusResult.TransactionCode,
                            TransferResults = resp.BonusResult.TransferResults
                        }
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to get Skrill url", ex);

                return new Dtos.Payment.PaymentDto.Skrill.DepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Withdrawal via Skrill
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("skrill/withdraw")]
        [ValidateNullRequest]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Skrill.WithdrawalResponse WithdrawBySkrill([FromBody] Dtos.Payment.PaymentDto.Skrill.WithdrawalReuest request)
        {
            Log.Info("Withdrawing by Skrill");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Skrill)
                    .ValidateWithdraw(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Skrill.WithdrawalResponse { Code = validationResult.Value };
            }

            try
            {
                _paymentApiProxy.WithdrawBySkrill(CultureCode, _userContext.UserId,
                    new PaymentDto.Skrill.Withdrawal { Amount = request.Amount, Email = request.Email, IPAddress = _networkUtility.GetClientIPAddress() });

                return new Dtos.Payment.PaymentDto.Skrill.WithdrawalResponse
                {
                    Code = ResponseCode.Success
                };
            }
            catch (WithdrawalNotCompletedException ex)
            {
                Log.Error("Failed to withdraw by Skrill", ex);

                return new Dtos.Payment.PaymentDto.Skrill.WithdrawalResponse
                {
                    Code = ResponseCode.WithdrawalNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Query Deposit Status via Skrill
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("skrill/deposit-status")]
        [ValidateNullRequest]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusResponse GetSkrillDepositStatus(
            [FromUri] Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusReuest request)
        {
            Log.Info("Getting deposit status for Skrill");
            int i = 1;
            var payload = new PaymentDto.Skrill.DepositStatus
            {
                TransactionId = request.TransactionId,
                Try = i,
                MaximumTry = request.MaximumTry
            };

            var response = _paymentApiProxy.GetSkrillDepositStatusLoop(CultureCode, _userContext.UserId, payload);
            
            while (!response.Completed && i < payload.MaximumTry)
            {
                Thread.Sleep(5000);
                i++;
                payload.Try = i;
                //response = await paymentApiProxy.GetResultAsync(CultureCode, userContext.UserId, param);
                response = _paymentApiProxy.GetSkrillDepositStatusLoop(CultureCode, _userContext.UserId, payload);
                if (response.Completed)
                {
                    return new Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusResponse
                    {
                        Code = ResponseCode.Success,
                        Message = response.Message,
                        Completed = response.Completed,
                        Succeeded = response.Succeeded,
                        Payment = new PaymentModel
                        {
                            ReferenceNumber = response.TrasactionId,
                            Amount = response.DepositAmount,
                            Balance = response.CurrentBalance
                        }
                    };
                }
            }

            //if (!response.Completed)
            //{
            //    System.Timers.Timer aTimer = new System.Timers.Timer(5000);
            //    int i = 2;

            //    aTimer.Elapsed += (s, e) =>
            //    {
            //        response = _paymentApiProxy.GetSkrillDepositStatusLoop(CultureCode, _userContext.UserId, payload);
            //        if (response.Completed)
            //        {
            //            aTimer.Stop();
            //            aTimer.Dispose();
            //        }

            //        i++;
            //        if (i >= payload.MaximumTry)
            //        {
            //            aTimer.Stop();
            //            aTimer.Dispose();

            //            Log.Info("Getting deposit status for Skrill reach maximum try that's not completed");
            //        }
            //    };

            //    aTimer.AutoReset = true;
            //    aTimer.Enabled = true;
            //}



            return new Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusResponse
            {
                Code = ResponseCode.Success,
                Message = response.Message,
                Completed = response.Completed,
                Succeeded = response.Succeeded,
                Payment = new PaymentModel
                {
                    ReferenceNumber = response.TrasactionId,
                    Amount = response.DepositAmount,
                    Balance = response.CurrentBalance
                }
            };
        }

        public Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusResponse GetSkrillDepositStatusLoop(
            [FromUri] Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusReuest request)
        {
            Log.Info("Getting deposit status for Skrill");

            var payload = new PaymentDto.Skrill.DepositStatus
            {
                TransactionId = request.TransactionId,
                Try = request.Try,
                MaximumTry = request.MaximumTry
            };

            var response = _paymentApiProxy.GetSkrillDepositStatusLoop(CultureCode, _userContext.UserId, payload);

            return new Dtos.Payment.PaymentDto.Skrill.GetSkrillDepositStatusResponse
            {
                Code = ResponseCode.Success,
                Message = response.Message,
                Completed = response.Completed,
                Succeeded = response.Succeeded,
                Payment = new PaymentModel
                {
                    ReferenceNumber = response.TrasactionId,
                    Amount = response.DepositAmount,
                    Balance = response.CurrentBalance
                }
            };
        }

        /// <summary>
        /// Retreives the skrill withdrawal card(account email) of the current player
        /// </summary>
        /// <returns>
        /// {
        ///     Email: "soe.than@aftech.sg"
        ///     Code: "Success"
        /// }
        /// </returns>
        [Route("skrill/details")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Skrill.GetAccountDetailResponse GetSkrillAccountDetail()
        {
            Log.Info("Getting Skrill account detail.");

            var account = _paymentApiProxy.GetSkrillAccountDetail(CultureCode, _userContext.UserId);

            if (account == null)
            {
                return new Dtos.Payment.PaymentDto.Skrill.GetAccountDetailResponse
                {
                    Code = ResponseCode.AccountDetailNotFound
                };
            }

            return new Dtos.Payment.PaymentDto.Skrill.GetAccountDetailResponse
            {
                Code = ResponseCode.Success,
                Email = account.Email
            };
        }

        [Route("~/{culture}/MoneybookersPublic/DepositStatus")]
        [Route("~/{culture}/mobile/MoneybookersPublic/DepositStatus")]
        [AllowAnonymous]
        [SuppressCsrfProtection]
        [HttpPost]
        public HttpResponseMessage SendSkrillDepositStatus([FromBody] FormDataCollection collection)
        {
            Log.InfoFormat("Got requests from [{0}] and sending Skrill deposit status.\n{1}",
                _networkUtility.GetClientIPAddress(), collection == null ? string.Empty : string.Join(", ", collection));

            try
            {
                var depositUrl =
                    new Uri(string.Format("{0}/{1}/{2}", _configurations.DefaultDomain, CultureCode,
                        _configurations.DepositPath));

                var casinoUrl =
                    new Uri(string.Format("{0}/{1}/{2}", _configurations.DefaultDomain, CultureCode,
                        _configurations.CasinoPath));

                _paymentApiProxy.SendSkrillDepositNotification(CultureCode,
                    collection != null ? collection.ReadAsNameValueCollection() : new NameValueCollection(),
                    depositUrl, casinoUrl);
            }
            catch (DepositNotificationNotSentException ex)
            {
                Log.Error("Failed to send Skrill deposit status", ex);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}