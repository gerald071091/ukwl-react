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
        /// Deposit via Ukash
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("ukash/deposit")]
        [ValidateNullRequest]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Ukash.DepositResponse DepositByUkash(
            [FromBody] Dtos.Payment.PaymentDto.Ukash.DepositReuest request)
        {
            Log.Info("Depositing by Ukash");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Ukash)
                    .ValidateDeposit(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Ukash.DepositResponse { Code = validationResult.Value };
            }

            var payload = new PaymentDto.Ukash.Deposit
            {
                ProductId = ProductMapping.Mappings[request.Product],
                Amount = request.Amount,
                BonusCode = string.IsNullOrEmpty(request.BonusCode) ? string.Empty : request.BonusCode.Trim(),
                CasinoUrl = request.CasinoUrl,
                DepositUrl = request.DepositUrl,
                IPAddress = _networkUtility.GetClientIPAddress(),
                VoucherNumber = request.VoucherNumber,
                VoucherValue = request.VoucherValue,
                SendTerms = request.SendTerms
            };

            try
            {
                var result = _paymentApiProxy.DepositByUkash(CultureCode, _userContext.UserId, payload);

                return new Dtos.Payment.PaymentDto.Ukash.DepositResponse
                {
                    Code = ResponseCode.Success,
                    Payment = new PaymentModel
                    {
                        ReferenceNumber = result.UkashDepositReturn.TrackingNumber,
                        Amount = result.UkashDepositReturn.Amount,
                        Balance = result.UkashDepositReturn.CurrentAmount
                    },
                    DepositResult = new Dtos.Payment.PaymentDto.Ukash.DepositResponse.UkashDepositReturn
                    {
                        Amount = result.UkashDepositReturn.Amount,
                        ChangeVoucherCurrency = result.UkashDepositReturn.ChangeVoucherCurrency,
                        ChangeVoucherExpiryDate = result.UkashDepositReturn.ChangeVoucherExpiryDate,
                        ChangeVoucherNumber = result.UkashDepositReturn.ChangeVoucherNumber,
                        ChangeVoucherValue = result.UkashDepositReturn.ChangeVoucherValue,
                        CurrentAmount = result.UkashDepositReturn.CurrentAmount,
                        ErrorCode = result.UkashDepositReturn.ErrorCode,
                        TrackingNumber = result.UkashDepositReturn.TrackingNumber,
                        TransactionCurrency = result.UkashDepositReturn.TransactionCurrency,
                        TransactionId = result.UkashDepositReturn.TransactionId,
                        TransferResult = result.UkashDepositReturn.TransferResult,
                        TransactionStatusReturn = result.UkashDepositReturn.TransactionStatusReturn
                    }
                };
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to deposit by Ukash", ex);
                return new Dtos.Payment.PaymentDto.Ukash.DepositResponse
                {
                    Code = ResponseCode.DepositNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Withdrawal via Ukash
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("ukash/withdraw")]
        [ValidateNullRequest]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Ukash.WithdrawalResponse WithdrawByUkash(
            [FromBody] Dtos.Payment.PaymentDto.Ukash.WithdrawalReuest request)
        {
            Log.Info("Withdrawing by Ukash");

            var validationResult =
                new PaymentValidator(_paymentApiProxy, CultureCode, _userContext.UserId, PaymentMethod.Ukash)
                    .ValidateWithdraw(request);

            if (validationResult.HasValue)
            {
                return new Dtos.Payment.PaymentDto.Ukash.WithdrawalResponse { Code = validationResult.Value };
            }

            try
            {
                var payload = new PaymentDto.Ukash.Withdrawal
                {
                    Amount = request.Amount,
                    IPAddress = _networkUtility.GetClientIPAddress(),
                };

                var ukashRes = _paymentApiProxy.WithdrawByUkash(CultureCode, _userContext.UserId, payload);

                return new Dtos.Payment.PaymentDto.Ukash.WithdrawalResponse
                {
                    Code = ResponseCode.Success,
                    TrackingNumber = ukashRes.TrackingNumber,
                    UkashWithdrawReturn =
                        ukashRes.UkashWithdrawReturn == null
                            ? null
                            : new Dtos.Payment.PaymentDto.Ukash.WithdrawalResponse.UkashWithdrawTransferResult
                            {
                                IssueVoucherCurrency = ukashRes.UkashWithdrawReturn.IssueVoucherCurrency,
                                IssueVoucherExpiryDate = ukashRes.UkashWithdrawReturn.IssueVoucherExpiryDate,
                                IssueVoucherNumber = ukashRes.UkashWithdrawReturn.IssueVoucherNumber,
                                IssueVoucherValue = ukashRes.UkashWithdrawReturn.IssueVoucherValue,
                                TrackingNumber = ukashRes.UkashWithdrawReturn.TrackingNumber,
                                TransferResult = ukashRes.UkashWithdrawReturn.TransferResult,
                                ErrorCode = ukashRes.UkashWithdrawReturn.ErrorCode
                            }
                };
            }
            catch (WithdrawalNotCompletedException ex)
            {
                Log.Error("Failed to withdraw by Ukash", ex);
                return new Dtos.Payment.PaymentDto.Ukash.WithdrawalResponse
                {
                    Code = ResponseCode.WithdrawalNotCompleted,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("ukash/activate")]
        [ValidateNullRequest]
        [AllowAnonymous]
        [HttpPost]
        public Dtos.Payment.PaymentDto.Ukash.ActivateUkashVoucherResponse ActivateUkashVoucher([FromBody] Dtos.Payment.PaymentDto.Ukash.ActivateUkashVoucherRequest request)
        {
            Log.Info("Activating Ukash voucher");

            try
            {
                var voucher = _paymentApiProxy.ActivateUkashVoucher(CultureCode, new PaymentDto.Ukash.Activation
                {
                    Code = request.Code,
                    Username = request.Username,
                    Password = request.Password
                });

                return new Dtos.Payment.PaymentDto.Ukash.ActivateUkashVoucherResponse
                {
                    Code = ResponseCode.Success,
                    Voucher = new Dtos.Payment.PaymentDto.Ukash.ActivateUkashVoucherResponse.VoucherModel
                    {
                        Number = voucher.Number,
                        Value = voucher.Value,
                        ActivationDate = voucher.ActivationDate,
                        Currency = voucher.Currency,
                        ExpiryDate = voucher.ExpiryDate
                    }
                };
            }
            catch (VoucherNotActivatedException ex)
            {
                Log.Error("Failed to activate Ukash voucher", ex);
                return new Dtos.Payment.PaymentDto.Ukash.ActivateUkashVoucherResponse
                {
                    Code = ResponseCode.VoucherNotActivated,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}