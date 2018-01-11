using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace AFT.WebCore.Dtos
{
    public class ApiResponse
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public ResponseCode Code { get; set; }

        public string ErrorMessage { get; set; }

        public string Message { get; set; }
    }

    public class ApiResponse<T>
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public ResponseCode Code { get; set; }

        public string ErrorMessage { get; set; }

        public string Message { get; set; }
    }

    public class HistoryApiResponse<T> : ApiResponse<T>
    {
        public int TotalNumber { get; set; }

        public T[] Histories { get; set; }
    }

    public enum ResponseCode
    {
        // Common
        InvalidRequest,

        UnexpectedError,
        Success,
        Failed,
        UnauthenticatedUser,
        NotSupported,
        BrokenApiProxy,
        UrlNotFound,
        ProductNotFound,
        ProductNotAvailable,
        SessionExpired,
        DeactivatedAccount,

        // LogIn
        LoginMaxAttemptsFailed,

        // ReSharper disable InconsistentNaming
        BlockedIP,

        // ReSharper restore InconsistentNaming

        BlockedCountry,
        SelfExcludedUser,
        WrongCredential,
        SuspendedUser,
        ClosedUser,
        InactivatedUser,
        LoginFailed,

        // ChangePassword
        InvalidPassword,

        InvalidNewPassword,
        SamePasswords,
        WrongPassword,

        // SignUp
        DuplicateUsername,
        BadData,
        DuplicateEmail,
        IntroducerNotFound,
        DuplicateMobileNumber,
        CountryNotFound,
        CurrencyNotFound,
        InvalidDateOfBirth,
        IovationDenied,

        // Bonus
        BonusAndBettingBalancesNotFound,

        BonusNotClaimed,

        // Promotion
        PromotionNotFound,

        // Announcement
        AnnouncementNotFound,

        // Payment
        TransactionError,

        Pending3DSecure,
        VoucherNotActivated,
        AccountDetailNotFound,
        WithdrawalNotCompleted,
        DepositNotCompleted,
        DepositNotFound,

        //WorldPay
        WorldPayResetError,
        WorldPayExceedResetsLimitPerDayError,
        WorldPayFastPayCardInfoError,
        WorldPayDepositFastPayCardError,
        WorldPayDepositWithNoFastPay,
        
        //Raven
        RavenResetError,
        RavenExceedResetsLimitPerDayError,

        // Product
        SameWallet,

        TransferNotCompleted,
        PaymentMethodNotAllowed,
        WalletNotFound,
        BalanceNotFound,

        // ResetPassword
        UserNotFound,

        EmailNotMatched,
        SecurityQuestionNotMatched,
        SecurityAnswerNotMatched,
        ResetPasswordFailed,

        // Utility
        BannerNotHit,
        FailedToConvertDecimal,

        FriendNotReferred,
        QueryNotSent,

        // Terms and Conditions
        TermsNotRead,

        TermsNotAccepted,

        // My Details
        UserDetailsNotFound,
        UnableToGetDepositLimit,
        UnableToSetDepositLimit,
        UnableToConfirmDepositLimit,
        UnableToCancelDepositLimit,

        //Subscription
        SetSubscriptionFailed,
        GetSubscriptionFailed,

        //QuickFire
        InvalidPlayerStatus,

		//Sportsbook
		MappingNotValid

	}
}