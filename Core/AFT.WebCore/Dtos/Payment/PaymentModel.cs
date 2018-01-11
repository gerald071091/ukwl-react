namespace AFT.WebCore.Dtos.Payment
{
    public class PaymentModel
    {
        public string ReferenceNumber { get; set; }

        public decimal Amount { get; set; }

        public decimal Balance { get; set; }

        public BonusResultModel BonusResult { get; set; }

        //public string PaymentAuthenticationRequest { get; set; }

        //public string VerificationUrl { get; set; }

        public class BonusResultModel
        {
            /// <summary>
            /// Transaction id
            /// </summary>
            /// <example>E00000001</example>
            public string TransactionCode { get; set; }

            /// <summary>
            /// Error code is "" when success
            /// </summary>
            /// <example>F0019</example>
            public string ErrorCode { get; set; }

            /// <summary>
            /// 1: Fail
            /// 2: Success
            /// </summary>
            public int TransferResults { get; set; }

            /// <summary>
            /// Error message from API
            /// "Invalid bonus code for the wallet selected, please try again."
            /// </summary>
            public string ErrorDetails { get; set; }
        }
    }
}