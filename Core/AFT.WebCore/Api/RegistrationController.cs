using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Account;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class RegistrationController : ApiBase
    {
        #region private field(s)

        private readonly IAccountApiProxy _accountApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly NetworkUtility _networkUtility;

        #endregion private field(s)

        public RegistrationController(IAccountApiProxy accountApiProxy, IUtilityApiProxy utilityApiProxy, NetworkUtility networkUtility)
        {
            Contract.Requires(accountApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(networkUtility != null);

            _accountApiProxy = accountApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _networkUtility = networkUtility;
        }

        [Route("signup")]
        [HttpPost]
        [AllowAnonymous]
        [ValidateNullRequest]
        [UserAgentLog]
        public virtual SignUpResponse SignUp([FromBody]SignUpRequest request)
        {
            try
            {
                string ipAddress = _networkUtility.GetClientIPAddress();

                Log.InfoFormat("User signing up an account {0} from {1}", request.Username, ipAddress);

                //var ipBlockedResult = _utilityApiProxy.IPBlocked(CultureCode, ipAddress, _networkUtility.GetServerHost(),
                //    IPBlockType.LoginOrRegister);

                //if (ipBlockedResult.Blocked)
                //{
                //    return new SignUpResponse
                //    {
                //        Code = ResponseCode.BlockedIP,
                //    };
                //}

                var currencies = _utilityApiProxy.GetCurrencies(CultureCode);

                if (string.IsNullOrWhiteSpace(request.Currency) || currencies.All(x => x.Code != request.Currency))
                {
                    return new SignUpResponse
                    {
                        Code = ResponseCode.CurrencyNotFound,
                    };
                }

                var signUpDetails = new SignUpDetails
                {
                    Username = request.Username,
                    Password = request.Password,
                    SecurityQuestion =
                        Enum.IsDefined(typeof(SecurityQuestion), request.SecurityQuestion)
                            ? request.SecurityQuestion
                            : SecurityQuestion.None,
                    SecurityAnswer = request.SecurityAnswer,
                    Title = request.Title,
                    FirstName = request.FirstName,
                    MiddleName = request.MiddleName,
                    LastName = request.LastName,
                    PostalCode = request.PostalCode,
                    DateOfBirth = request.DateOfBirth,
                    MobileNumber = request.MobileNumber,
                    Email = request.Email,
                    City = request.City,
                    Country = request.Country,
                    AddressLine1 = request.AddressLine1,
                    AddressLine2 = request.AddressLine2,
                    AddressLine3 = request.AddressLine3,
                    IPAddress = ipAddress,
                    VerificationType = VerificationType.Email,
                    Introducer = request.Introducer,
                    BTag = request.BTag,
                    Nationality = request.Nationality,
                    Currency = request.Currency,
                    Subscription = request.Subscription,
                    DepositDayLimit = request.DepositDayLimit,
                    DepositMonthLimit = request.DepositMonthLimit,
                    DepositWeekLimit = request.DepositWeekLimit,
                    Platform = string.IsNullOrEmpty(request.Platform) ? string.Empty : request.Platform,
                    IovationBlackBox = string.IsNullOrEmpty(request.IovationBlackBox) ? string.Empty : request.IovationBlackBox,
                    FirstPartyBlackBox = string.IsNullOrEmpty(request.FirstPartyBlackBox) ? string.Empty : request.FirstPartyBlackBox,
                    isHousePlayer = string.IsNullOrEmpty(request.isHousePlayer) ? "N" : request.isHousePlayer
                };

                _accountApiProxy.SignUp(CultureCode, signUpDetails);

                Log.InfoFormat("User {0} signed up from {1}.", signUpDetails.Username, signUpDetails.IPAddress);

                return new SignUpResponse { Code = ResponseCode.Success };
            }
            catch (DuplicateUsernameException ex)
            {
                return new SignUpResponse { Code = ResponseCode.DuplicateUsername, ErrorMessage = ex.Message };
            }
            catch (DuplicateEmailException ex)
            {
                return new SignUpResponse { Code = ResponseCode.DuplicateEmail, ErrorMessage = ex.Message };
            }
            catch (IntroducerNotFoundException ex)
            {
                return new SignUpResponse { Code = ResponseCode.IntroducerNotFound, ErrorMessage = ex.Message };
            }
            catch (DuplicateMobileNumberException ex)
            {
                return new SignUpResponse { Code = ResponseCode.DuplicateMobileNumber, ErrorMessage = ex.Message };
            }
            catch (BadDataException ex)
            {
                return new SignUpResponse { Code = ResponseCode.BadData, ErrorMessage = ex.Message };
            }
            catch (IovationDeniedException ex)
            {
                return new SignUpResponse { Code = ResponseCode.IovationDenied, ErrorMessage = ex.Message };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new SignUpResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }
        }

        [Route("isUsernameExist"), HttpPost]
        [AllowAnonymous]
        public virtual PlayerInfoExistsResponse UsernameExists([FromBody]PlayerInfoExistsRequest playerInfoExistsRequest)
        {
            try
            {
                var response = _accountApiProxy.UsernameExists(CultureCode, playerInfoExistsRequest.LoginName);

                switch (response.Result)
                {
                    case 0:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.Success };

                    case 1:
                        return new PlayerInfoExistsResponse { isExists = true, Message = response.Message, Code = ResponseCode.Success };

                    default:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.InvalidRequest };
                }
            }
            catch (Exception ex)
            {
                return new PlayerInfoExistsResponse { Code = ResponseCode.UnexpectedError, ErrorMessage = ex.Message };
            }
        }

        [Route("isEmailaddressExist"), HttpPost]
        [AllowAnonymous]
        public virtual PlayerInfoExistsResponse EmailAddressExists([FromBody]PlayerInfoExistsRequest playerInfoExistsRequest)
        {
            try
            {
                var response = _accountApiProxy.EmailAddressExists(CultureCode, playerInfoExistsRequest.EmailAddress);

                switch (response.Result)
                {
                    case 0:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.Success };

                    case 1:
                        return new PlayerInfoExistsResponse { isExists = true, Message = response.Message, Code = ResponseCode.Success };

                    default:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.InvalidRequest };
                }
            }
            catch (Exception ex)
            {
                return new PlayerInfoExistsResponse { Code = ResponseCode.UnexpectedError, ErrorMessage = ex.Message };
            }
        }

        [Route("isMobileNumberExist"), HttpPost]
        [AllowAnonymous]
        public virtual PlayerInfoExistsResponse MobileNumberExists([FromBody]PlayerInfoExistsRequest playerInfoExistsRequest)
        {
            try
            {
                var response = _accountApiProxy.MobileNumberExists(CultureCode, playerInfoExistsRequest.MobileNumber);

                switch (response.Result)
                {
                    case 0:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.Success };

                    case 1:
                        return new PlayerInfoExistsResponse { isExists = true, Message = response.Message, Code = ResponseCode.Success };

                    default:
                        return new PlayerInfoExistsResponse { isExists = false, Message = response.Message, Code = ResponseCode.InvalidRequest };
                }
            }
            catch (Exception ex)
            {
                return new PlayerInfoExistsResponse { Code = ResponseCode.UnexpectedError, ErrorMessage = ex.Message };
            }
        }

        [Route("GetCountryCodeByIp"), HttpGet]
        [AllowAnonymous]
        public virtual ApiResponse GetCountryCodeByIp()
        {
            Log.Info("Getting country code by ip");

            var ipAddress = _networkUtility.GetClientIPAddress();

            var response = _accountApiProxy.GetCountryCodeByIp(CultureCode, ipAddress);

            if (response.Result == 1)
            {
                return new ApiResponse { Code = ResponseCode.Success, Message = response.Message };
            }

            return new ApiResponse { Code = ResponseCode.Failed, Message = response.Message };
        }

    }
}