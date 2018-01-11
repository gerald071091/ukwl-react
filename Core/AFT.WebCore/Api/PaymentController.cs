using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;
using PaymentDto = AFT.WebCore.Dtos.Payment.PaymentDto;


namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}/payment")]
    [UserAgentLog]
    public partial class PaymentController : ApiBase
    {
        #region private field(s)

        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;
        private readonly Configurations _configurations;
        private readonly IPaymentApiProxy _paymentApiProxy;

        #endregion private field(s)

        public PaymentController(IPaymentApiProxy paymentApiProxy, UserContext userContext, NetworkUtility networkUtility, Configurations configurations)
        {
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);
            Contract.Requires(paymentApiProxy != null);
            Contract.Requires(configurations != null);

            _paymentApiProxy = paymentApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
            _configurations = configurations;
        }

        /// <summary>
        /// Returns the latest payment information
        /// </summary>
        /// <returns>
        /// {
        ///     HasDeposited: true/false,
        ///     Method: 101/106
        /// }
        /// </returns>
        [Route("last-executed")]
        [HttpGet]
        public virtual PaymentDto.GetLatestDepositResponse GetLastExecutedDepositMethod()
        {
            Log.Info("Getting last executed deposit method.");

            var method = _paymentApiProxy.GetWithdrawalMethod(CultureCode, _userContext.UserId);

            return new PaymentDto.GetLatestDepositResponse
            {
                Code = ResponseCode.Success,
                HasDeposited = method.HasValue,
                Method = method.HasValue ? method.Value.ToString() : null
            };
        }

        /// <summary>
        /// Returns payment methods that's available of the current player
        /// </summary>
        /// <returns>
        /// [101,106]
        /// </returns>
        [Route("methods")]
        [HttpGet]
        public PaymentDto.GetDepositMethodsAvailableResponse DepositMethodsAvailable()
        {
            Log.Info("Getting available deposit methods.");

            var methods = _paymentApiProxy.GetDepositMethods(CultureCode, _userContext.UserId);

            var resp = new PaymentDto.GetDepositMethodsAvailableResponse
            {
                Code = ResponseCode.Success,
                Methods = methods.Select(x => x.ToString()).ToArray()
            };

            return resp;
        }

        [Route("histories")]
        [HttpGet]
        public PaymentDto.GetHistoriesResponse GetHistories(PaymentDto.PaymentHistoryType type, DateTime? from = null, DateTime? to = null, int page = 1, int pageSize = 10)
        {
            Log.Info("Getting payment histories");

            var start = from.HasValue ? from.Value : DateTime.Today.EndOfMonth();
            var end = to.HasValue ? to.Value : DateTime.Today.StartOfMonth();

            var historyType = (TransactionType)type;
            var histories = _paymentApiProxy.GetTransactions(CultureCode, _userContext.UserId, historyType, start, end);

            var resp = new PaymentDto.GetHistoriesResponse
            {
                Code = ResponseCode.Success,
                TotalNumber = histories.Count,
                Histories = histories.Skip((page - 1) * pageSize).Take(pageSize).Select(x => new PaymentDto.History
                {
                    ActualAmount = x.ActualAmount,
                    Amount = x.Amount,
                    Date = x.Date,
                    Fee = x.Fee,
                    RebateAmount = x.RebateAmount,
                    Status = x.Status,
                    StatusDesc = x.StatusDesc,
                    TotalAmount = x.TotalAmount,
                    TrackingNumber = x.TrackingNo,
                    TransactionId = x.TransactionId,
                    Type = x.Type
                }).ToList()
            };

            return resp;
        }

        [Route("bonus-status-upon-withdrawal"), HttpGet]
        public PaymentDto.IsBonusErasedOnWithdrawalResponse IsBonusErasedOnWithdrawal()
        {                
            Log.Info("Check that if this user's bonys will be Erased On Withdrawal");

            var willBonusErased = _paymentApiProxy.IsBonusErasedOnWithdrawal(CultureCode, _userContext.UserId);

            var resp = new PaymentDto.IsBonusErasedOnWithdrawalResponse()
            {
                DoNotifyWithPopup = willBonusErased.DoNotifyWithPopup,
                Code = ResponseCode.Success,
                Message = willBonusErased.Message
            };

            return resp;
        }

        [Route("get-deposit-page-limit-info"), HttpPost]
        public ApiResponse GetDepositPageLimitInfo()
        {
            Log.Info("Getting deposit page limit info");

            var response = _paymentApiProxy.GetDepositPageLimitInfo(CultureCode, _userContext.UserId);

            switch (response.Result)
            {
                case 0:
                    return new ApiResponse { Code = ResponseCode.Success, Message = response.Message };

                case 1:
                    return new ApiResponse { Code = ResponseCode.Success, Message = response.Message };

                default:
                    return new ApiResponse { Code = ResponseCode.Failed, Message = response.Message };
            }
        }

		[Route("transaction-deposit-limits"), HttpPost]
		public PaymentDto.PaymentTransactionLimitsResponse GetPerTransactionDepositLimits(TransactionLimitsDto transactionLimits)
		{
			Log.Info("Getting Transaction Deposit Limit");

			var response = _paymentApiProxy.GetPerTransactionDepositLimits(CultureCode, _userContext.UserId, transactionLimits);

			switch (response.Result)
			{
				case 0:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Success, Message = response.Message };

				case 1:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Success, Message = response.Message, Min = response.Min, Max = response.Max };

				default:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Failed, Message = response.Message };
			}
		}

		[Route("transaction-withdraw-limits"), HttpPost]
		public PaymentDto.PaymentTransactionLimitsResponse GetPerTransactionWithdrawLimits(TransactionLimitsDto transactionLimits)
		{
			Log.Info("Getting Transaction Withdrawal Limit");

			var response = _paymentApiProxy.GetPerTransactionWithdrawLimits(CultureCode, _userContext.UserId, transactionLimits);

			switch (response.Result)
			{
				case 0:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Success, Message = response.Message };

				case 1:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Success, Message = response.Message, Min = response.Min, Max = response.Max };

				default:
					return new PaymentDto.PaymentTransactionLimitsResponse { Code = ResponseCode.Failed, Message = response.Message };
			}
		}

		[Route("public-transaction-deposit-limits"), HttpPost]
		[AllowAnonymous]
		public PaymentDto.PaymentPublicTransactionLimitResponse GetPublicPerTransactionDepositLimits(TransactionLimitsDto transactionLimits)
		{
			Log.Info("Getting Transaction Deposit Limit for public");

			var response = _paymentApiProxy.GetPublicPerTransactionDepositLimits(CultureCode, transactionLimits);

			switch (response.Result)
			{
				case 0:
					return new PaymentDto.PaymentPublicTransactionLimitResponse { Code = ResponseCode.Success, Message = response.Message };

				case 1:
					return new PaymentDto.PaymentPublicTransactionLimitResponse { Code = ResponseCode.Success, Message = response.Message, PaymentPublicTransactionLimit = response.List };

				default:
					return new PaymentDto.PaymentPublicTransactionLimitResponse { Code = ResponseCode.Failed, Message = response.Message };
			}
		}
	}
}