using System;
using System.Collections.Generic;
using AFT.RegoApi.Proxy.Dtos;

namespace AFT.WebCore.Dtos.Payment
{
    public partial class PaymentDto
    {
        public class GetLatestDepositResponse : ApiResponse
        {
            /// <summary>
            /// Indicates whether if user has executed success deposit before
            /// </summary>
            public bool HasDeposited { get; set; }

            /// <summary>
            /// TODO: Move the enum to proxy
            /// </summary>
            //public RegoApi.Proxy.PaymentMethod? Method { get; set; }
            public string Method { get; set; }
        }

        public class GetDepositMethodsAvailableResponse : ApiResponse
        {
            public string[] Methods { get; set; }
        }

        public class DepositBaseRequest
        {
            public decimal Amount { get; set; }

            public string BonusCode { get; set; }

            /// <summary>
            /// As Equiv. to GameId's key, provide {Main, Sportsbook etc..}
            /// </summary>
            public string Product { get; set; }

            public bool SendTerms { get; set; }
        }

        public class WithdrawalBaseRequest
        {
            public decimal Amount { get; set; }
        }

        #region -- Histories

        public enum PaymentHistoryType
        {
            Payment = 0,
            Deposit = 1,
            Withdrawal = 2
        }

        public class GetHistoriesResponse : HistoryApiResponse<History>
        {
            public new List<History> Histories { get; set; }
        }

        public class IsBonusErasedOnWithdrawalResponse : ApiResponse
        {
            public bool DoNotifyWithPopup { get; set; }
        }

        public class History
        {
            public Guid TransactionId { get; set; }

            public string TrackingNumber { get; set; }

            public string Type { get; set; }

            public DateTime Date { get; set; }

            public int Status { get; set; }

            public string StatusDesc { get; set; }

            public decimal Amount { get; set; }

            public decimal ActualAmount { get; set; }

            public decimal Fee { get; set; }

            public decimal RebateAmount { get; set; }

            public decimal TotalAmount { get; set; }
        }

		#endregion -- Histories

		public class PaymentTransactionLimitsResponse : ApiResponse
		{
			public string Min { get; set; }

			public string Max { get; set; }
		}

		public class PaymentPublicTransactionLimitResponse : ApiResponse
		{
			public List<PublicTransactionLimitResponse.Limits> PaymentPublicTransactionLimit { get; set; }
		}
	}
}