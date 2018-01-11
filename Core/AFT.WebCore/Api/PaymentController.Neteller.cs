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
        /// Deposit via Neteller (credit card)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("neteller/deposit")]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Neteller.DepositResponse DepositByNeteller([FromBody]Dtos.Payment.PaymentDto.Neteller.DepositRequest request)
        {
            Log.Info("Depositing by Neteller");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Neteller)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Neteller.DepositResponse { Code = validationResult.Value };
            }

            try
            {
                var result = _paymentApiProxy.DepositByNeteller(CultureCode, _userContext.UserId,
                    new PaymentDto.Neteller.Deposit
                    {
                        ProductId = ProductMapping.Mappings[request.Product],
                        Amount = request.Amount,
                        BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                        DepositUrl = request.DepositUrl,
                        CasinoUrl = request.CasinoUrl,
                        SendTerms = request.SendTerms,
                        IPAddress = _networkUtility.GetClientIPAddress(),
                        SecureId = request.SecureId,
                        AccountId = request.AccountId,
                        Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform
                    });

                return new Dtos.Payment.PaymentDto.Neteller.DepositResponse
                {
                    Code = ResponseCode.Success,
                    Payment = new PaymentModel
                    {
                        ReferenceNumber = result.TransactionId,
                        Amount = result.DepositAmount,
                        Balance = result.CurrentBalance,
                        BonusResult = result.BonusResult == null
                            ? null
                                : new PaymentModel.BonusResultModel
                                {
                                    ErrorCode = result.BonusResult.ErrorCode,
                                    ErrorDetails = result.BonusResult.ErrorDetails,
                                    TransactionCode = result.BonusResult.TransactionCode,
                                    TransferResults = result.BonusResult.TransferResults
                                }
                    }
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to deposit by Neteller", ex);
                return new Dtos.Payment.PaymentDto.Neteller.DepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Withdrawal via netteller
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("neteller/withdraw")]
        [HttpPost]
        public ApiResponse WithdrawByNeteller([FromBody]Dtos.Payment.PaymentDto.Neteller.WithdrawalRequest request)
        {
            Log.Info("Withdrawing by Neteller");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Neteller)
                    .ValidateWithdraw(request);

            if (validationResult.HasValue)
            {
                return new ApiResponse { Code = validationResult.Value };
            }

            try
            {
                _paymentApiProxy.WithdrawByNeteller(CultureCode, _userContext.UserId, new PaymentDto.Neteller.Withdrawal
                {
                    AccountId = request.AccountId,
                    Amount = request.Amount,
                    IPAddress = _networkUtility.GetClientIPAddress()
                });

                return new ApiResponse
                {
                    Code = ResponseCode.Success
                };
            }
            catch (WithdrawalNotCompletedException ex)
            {
                Log.Error("Failed to withdraw by Neteller", ex);
                return new ApiResponse
                {
                    Code = ResponseCode.WithdrawalNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Retreives the netteller withdrawal card(account id) of the current player
        /// </summary>
        /// <returns>
        /// {
        ///     CardNumber: "4544320001228342"
        ///     Code: "Success"
        /// }
        /// </returns>
        [Route("neteller/details")]
        [HttpGet]
        public Dtos.Payment.PaymentDto.Neteller.GetAccountDetailResponse GetNetellerAccountDetail()
        {
            Log.Info("Getting Neteller account detail");

            var account = _paymentApiProxy.GetNetellerAccountDetail(CultureCode, _userContext.UserId);

            if (account == null)
            {
                return new Dtos.Payment.PaymentDto.Neteller.GetAccountDetailResponse
                {
                    Code = ResponseCode.AccountDetailNotFound
                };
            }

            return new Dtos.Payment.PaymentDto.Neteller.GetAccountDetailResponse
            {
                Code = ResponseCode.Success,
                AccountId = account.AccountId
            };
        }
    }
}