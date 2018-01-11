using System.Diagnostics.Contracts;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Account;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class AccountController : ApiBase
    {
        #region private field(s)

        private readonly UserContext _userContext;
        private readonly IAccountApiProxy _accountApiProxy;
        private readonly ISportsbookApiProxy _sportsbookApiProxy;

        #endregion private field(s)

        public AccountController(IAccountApiProxy accountApiProxy, UserContext userContext, ISportsbookApiProxy sportsbookApiProxy)
        {
            Contract.Requires(accountApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(sportsbookApiProxy != null);

            _accountApiProxy = accountApiProxy;
            _userContext = userContext;
            _sportsbookApiProxy = sportsbookApiProxy;
        }

        [Route("my-details"), HttpGet]
        public virtual GetMyDetailsResponse GetMyDetails()
        {
            var details = _accountApiProxy.GetMyDetails(CultureCode, _userContext.UserId);

            if (details == null)
            {
                return new GetMyDetailsResponse { Code = ResponseCode.UserDetailsNotFound };
            }

            string symbol;
            if (!CurrencyUtility.TryGetCurrencySymbol(_userContext.Currency, out symbol))
            {
                symbol = "$";
            }

            return new GetMyDetailsResponse
            {
                Code = ResponseCode.Success,
                User = new UserModel
                {
                    Username = _userContext.Username,
                    FirstName = details.FirstName,
                    LastName = details.LastName,
                    AddressLine1 = details.AddressLine1,
                    AddressLine2 = details.AddressLine2,
                    AddressLine3 = details.AddressLine3,
                    PostalCode = details.PostalCode,
                    MobileNumber = details.MobileNumber,
                    Email = details.Email,
                    City = details.City,
                    Country = details.Country,
                    CurrencySymbol = symbol,
                    Status = details.Status,
                    LowDeposit = details.LowDeposit
                },

                // Should not be doing this because the token is not sharable between mobile and desktop
                //SportsbookUrl = _sportsbookApiProxy.GetSbTechUrl(CultureCode, _userContext.Username),
                //SportsbookMobileUrl = _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode, _userContext.Username)
            };
        }

        [Route("self-exclude"), HttpPost]
        [ValidateNullRequest]
        public virtual SelfExcludeResponse SelfExclude([FromBody]SelfExcludeRequest request)
        {
            Log.InfoFormat("User selfexcluding.");

            _accountApiProxy.SelfExclude(CultureCode, _userContext.UserId, request.Days, request.isCompulsiveGambler, request.Reason, request.linkedAccounts);

            Log.InfoFormat("User selfexcluded.");

            return new SelfExcludeResponse { Code = ResponseCode.Success };
        }

        #region password

        [Route("change-password"), HttpPost]
        [ValidateNullRequest]
        public virtual ChangePasswordResponse ChangePassword([FromBody]ChangePasswordRequest request)
        {
            try
            {
                Log.InfoFormat("User changing password.");

                _accountApiProxy.ChangePassword(CultureCode, _userContext.UserId, _userContext.Username, request.Current,
                    request.New);

                Log.InfoFormat("User changed password.");

                return new ChangePasswordResponse { Code = ResponseCode.Success };
            }
            catch (InvalidPasswordException ex)
            {
                return new ChangePasswordResponse { Code = ResponseCode.InvalidPassword, ErrorMessage = ex.Message };
            }
            catch (InvalidNewPasswordException ex)
            {
                return new ChangePasswordResponse { Code = ResponseCode.InvalidNewPassword, ErrorMessage = ex.Message };
            }
            catch (SamePasswordsException ex)
            {
                return new ChangePasswordResponse { Code = ResponseCode.SamePasswords, ErrorMessage = ex.Message };
            }
            catch (WrongPasswordException ex)
            {
                return new ChangePasswordResponse { Code = ResponseCode.WrongPassword, ErrorMessage = ex.Message };
            }
        }

        [Route("reset-password"), HttpPost]
        [AllowAnonymous]
        [ValidateNullRequest]
        public virtual ResetPasswordResponse ResetPassword([FromBody]ResetPasswordRequest request)
        {
            try
            {
                switch (request.ResetType)
                {
                    case ResetPasswordType.SecurityQuestion:
                        _accountApiProxy.ResetPassword(CultureCode, request.Username, request.Email,
                            request.SecurityQuestion, request.SecurityAnswer, GetPasswordBy.Email);
                        break;

                    default:
                        _accountApiProxy.ResetPassword(CultureCode, request.Username, request.Email, GetPasswordBy.Email);
                        break;
                }
            }
            catch (UserNotFoundException ex)
            {
                return new ResetPasswordResponse { Code = ResponseCode.UserNotFound, ErrorMessage = ex.Message };
            }
            catch (EmailNotMatchedException ex)
            {
                return new ResetPasswordResponse { Code = ResponseCode.EmailNotMatched, ErrorMessage = ex.Message };
            }
            catch (SecurityQuestionNotMatchedException ex)
            {
                return new ResetPasswordResponse { Code = ResponseCode.SecurityQuestionNotMatched, ErrorMessage = ex.Message };
            }
            catch (SecurityAnswerNotMatchedException ex)
            {
                return new ResetPasswordResponse { Code = ResponseCode.SecurityAnswerNotMatched, ErrorMessage = ex.Message};
            }
            catch (ResetPasswordFailedException ex)
            {
                return new ResetPasswordResponse { Code = ResponseCode.ResetPasswordFailed, ErrorMessage = ex.Message };
            }

            return new ResetPasswordResponse { Code = ResponseCode.Success };
        }

        #endregion password

        #region deposit

        [Route("deposit-limits"), HttpGet]
        public virtual GetDepositLimitResponse GetDepositLimit()
        {
            try
            {
                var depositLimits = _accountApiProxy.GetPaymentLimit(CultureCode, _userContext.UserId);

                var pendingChange = (depositLimits.PendingChangesDto == null)
                    ? null
                    : new GetDepositLimitResponse.PendingDepositLimitChangeModel
                    {
                        CanConfirm = depositLimits.PendingChangesDto.CanConfirm,
                        ChangeType = depositLimits.PendingChangesDto.ChangeType,
                        CooldownText = depositLimits.PendingChangesDto.CooldownText,
                        NewLimit = depositLimits.PendingChangesDto.NewLimit
                    };

                return new GetDepositLimitResponse
                {
                    Code = ResponseCode.Success,
                    WeekLimit = depositLimits.DepositWeekLimit,
                    MonthLimit = depositLimits.DepositMonthLimit,
                    DayLimit = depositLimits.DepositDayLimit,
                    CoolDownEndTime = depositLimits.CoolDownEndTime,
                    PendingChange = pendingChange
                };
            }
            catch (UnableToGetPaymentLimitException ex)
            {
                return new GetDepositLimitResponse { Code = ResponseCode.UnableToGetDepositLimit, ErrorMessage = ex.Message };
            }
        }

        [Route("deposit-limits"), HttpPost]
        [ValidateNullRequest]
        public virtual SetDepositLimitResponse SetDepositLimit([FromBody]SetDepositLimitRequest request)
        {
            try
            {
                var resp = _accountApiProxy.SetPaymentLimit(CultureCode, _userContext.UserId, request.DayLimit, request.WeekLimit, request.MonthLimit);

                return new SetDepositLimitResponse()
                {
                    Code = ResponseCode.Success,
                    Message = resp.Message
                };
            }
            catch (UnableToSetPaymentLimitException ex)
            {
                return new SetDepositLimitResponse { Code = ResponseCode.UnableToSetDepositLimit, ErrorMessage = ex.Message };
            }
        }

        [Route("deposit-limit/confirm"), HttpPost]
        public virtual ConfirmDepositLimitResponse ConfirmDepositLimit()
        {
            try
            {
                var resp = _accountApiProxy.ConfirmPendingPaymentLimit(CultureCode, _userContext.UserId);

                return new ConfirmDepositLimitResponse()
                {
                    Code = ResponseCode.Success,
                    Message = resp.Message
                };
            }
            catch (UnableToConfirmPendingPaymentLimitException ex)
            {
                return new ConfirmDepositLimitResponse { Code = ResponseCode.UnableToConfirmDepositLimit, ErrorMessage = ex.Message };
            }
        }

        [Route("deposit-limit/cancel"), HttpPost]
        public virtual CancelDepositLimitResponse CancelDepositLimit()
        {
            try
            {
                var resp = _accountApiProxy.CancelPendingPaymentLimit(CultureCode, _userContext.UserId);

                return new CancelDepositLimitResponse
                {
                    Code = ResponseCode.Success,
                    Message = resp.Message
                };
            }
            catch (UnableToCancelPendingPaymentLimitException ex)
            {
                return new CancelDepositLimitResponse { Code = ResponseCode.UnableToCancelDepositLimit, ErrorMessage = ex.Message };
            }
        }

        #endregion deposit

        #region reality check

        [Route("get-reality-check-time"), HttpGet]
        public virtual GetRealityCheckTimeResponse GetRealityCheckTime()
        {
            try
            {
                var resp = _accountApiProxy.GetRealityCheckTime(CultureCode, _userContext.UserId.ToString());

                return new GetRealityCheckTimeResponse()
                {
                    Code = ResponseCode.Success,
                    AlertTime = resp.RealityAlertCheckTime
                };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new GetRealityCheckTimeResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }
        }

        [Route("set-reality-check-time"), HttpPost]
        public virtual ApiResponse SetRealityCheckTime([FromBody]RealityCheckTimeDto request)
        {
            try
            {
                _accountApiProxy.SetRealityCheckTime(CultureCode, _userContext.UserId.ToString(), request.RealityAlertCheckTime);

                return new ApiResponse { Code = ResponseCode.Success };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new ApiResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }
        }

        #endregion reality check
    }
}