using System;
using System.Diagnostics.Contracts;
using System.Web.Http;
using System.Web;

using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Account;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;
using AFT.WebCore.Dtos.TermsAndConditions;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class AuthenticationController : ApiBase
    {
        #region private field(s)

        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;
        private readonly HttpContextBase _httponContextBase;
        private readonly IAccountApiProxy _accountApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly ISportsbookApiProxy _sportsbookApiProxy;

        #endregion private field(s)

        public AuthenticationController(IAccountApiProxy accountApiProxy, IUtilityApiProxy utilityApiProxy,
            UserContext userContext, NetworkUtility networkUtility, HttpContextBase httponContextBase, ISportsbookApiProxy sportsbookApiProxy)
        {
            Contract.Requires(accountApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);
            Contract.Requires(sportsbookApiProxy != null);

            _accountApiProxy = accountApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
            _httponContextBase = httponContextBase;
            _sportsbookApiProxy = sportsbookApiProxy;
        }

        [Route("login")]
        [HttpPost]
        [AllowAnonymous]
        [ValidateNullRequest]
        [UserAgentLog]
        public virtual LogInResponse LogIn([FromBody]LogInRequest request)
        {
            string ipAddress = string.Empty;

            try
            {
                ipAddress = _networkUtility.GetClientIPAddress();

                Log.InfoFormat("User {0} logging in from {1}.", request.Username, ipAddress);

                LogInDto user = _accountApiProxy.LogIn(CultureCode, request.Username, request.Password, ipAddress, request.RememberMe,
                    request.Platform, request.IovationBlackBox, request.FirstPartyBlackBox);

                if (user == null)
                {
                    Log.InfoFormat("User {0} failed to log in.", request.Username);
                    return new LogInResponse { Code = ResponseCode.WrongCredential };
                }

                var sportsbookUrl = request.IsMobile
                    ? _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode, user.Username)
                    : _sportsbookApiProxy.GetSbTechUrl(CultureCode, user.Username);

                if (!String.IsNullOrEmpty(user.PlayerLoginToken))
                {
                    HttpCookie loginToken = new HttpCookie("lToken");
                    loginToken.Value = user.PlayerLoginToken;
                    loginToken.Expires = DateTime.Today.AddDays(30);
                    _httponContextBase.Response.Cookies.Add(loginToken);
                }

                _userContext.Save(new LoggedInUser
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Currency = user.Currency,
                    SportsbookUrl = sportsbookUrl
                });


                Log.InfoFormat("User {0} logged in.", request.Username);

                var hasReadTerms = _accountApiProxy.HasReadTheLatestTnC(CultureCode, user.UserId);

                HttpCookie hasReadTermsCookie = new HttpCookie("rTC");
                hasReadTermsCookie.Value = hasReadTerms.ToString();
                hasReadTermsCookie.Expires = DateTime.Today.AddDays(1);
                _httponContextBase.Response.Cookies.Add(hasReadTermsCookie);

                return new LogInResponse
                {
                    Code = ResponseCode.Success,
                    HasReadTerms = hasReadTerms,
                    SportsbookUrl = sportsbookUrl,
                    Token = user.PlayerLoginToken,
                    ExpirationMessageRG = String.IsNullOrEmpty(user.ExpirationMessageRG) ? string.Empty : user.ExpirationMessageRG
                };
            }
            catch (LoginFailedException ex)
            {
                return GetLogInResponse(request, ipAddress, ResponseCode.LoginFailed, ex);
            }
            catch (LoginMaxAttemptsFailedException ex)
            {
                return GetLogInResponse(request, ipAddress, ResponseCode.LoginMaxAttemptsFailed, ex);
            }
        }

        [Route("loginbytoken")]
        [HttpPost]
        [AllowAnonymous]
        [ValidateNullRequest]
        [UserAgentLog]
        public virtual LogInResponse LogInByToken([FromBody]LogInRequest request)
        {
            string ipAddress = string.Empty;

            try
            {
                ipAddress = _networkUtility.GetClientIPAddress();

                Log.InfoFormat("User with token {0} logging in from {1}.", request.Token, ipAddress);

                //var ipBlockedResult = _utilityApiProxy.IPBlocked(CultureCode, ipAddress, _networkUtility.GetServerHost(),
                //    IPBlockType.LoginOrRegister);

                //if (ipBlockedResult.Blocked)
                //{
                //    return new LogInResponse
                //    {
                //        Code = ResponseCode.BlockedIP,
                //    };
                //}

                //This will be change upon api updates
                LogInDto user = _accountApiProxy.LogInByToken(CultureCode, request.Token, ipAddress,
                    request.Platform, request.IovationBlackBox, request.FirstPartyBlackBox);

                if (user == null)
                {
                    Log.InfoFormat("User with token {0} failed to log in by token.", request.Token);
                    return new LogInResponse { Code = ResponseCode.WrongCredential };
                }

                var sportsbookUrl = request.IsMobile
                    ? _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode, user.Username)
                    : _sportsbookApiProxy.GetSbTechUrl(CultureCode, user.Username);

                _userContext.Save(new LoggedInUser
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Currency = user.Currency,
                    SportsbookUrl = sportsbookUrl
                });

                var lTokenCookie = _httponContextBase.Request.Cookies["lToken"];


                if (lTokenCookie != null)
                {
                    _httponContextBase.Response.Cookies.Remove("lToken");
                    lTokenCookie.Expires = DateTime.Today.AddDays(-1);
                    _httponContextBase.Response.SetCookie(lTokenCookie);

                    lTokenCookie.Expires = DateTime.Today.AddDays(30);
                    _httponContextBase.Response.SetCookie(lTokenCookie);
                }

                Log.InfoFormat("User with token {0} logged in.", request.Token);

                return new LogInResponse
                {
                    Code = ResponseCode.Success,
                    HasReadTerms = _accountApiProxy.HasReadTheLatestTnC(CultureCode, user.UserId),
                    SportsbookUrl = sportsbookUrl,
                    ExpirationMessageRG = String.IsNullOrEmpty(user.ExpirationMessageRG) ? string.Empty : user.ExpirationMessageRG
                };
            }
            catch (LoginFailedException ex)
            {
                var lTokenCookie = _httponContextBase.Request.Cookies["lToken"];

                if (lTokenCookie != null)
                {
                    _httponContextBase.Response.Cookies.Remove("lToken");
                    lTokenCookie.Expires = DateTime.Today.AddDays(-1);
                    _httponContextBase.Response.SetCookie(lTokenCookie);
                }

                return GetLogInResponse(request, ipAddress, ResponseCode.LoginFailed, ex);
            }
        }

        [Route("logout")]
        [HttpPost]
        public virtual LogOutResponse LogOut()
        {
            try
            {
                Log.InfoFormat("User logging out.");
                _userContext.LogOut();
                var lTokenCookie = _httponContextBase.Request.Cookies["lToken"];
                if (lTokenCookie != null)
                {
                    _httponContextBase.Response.Cookies.Remove("lToken");
                    lTokenCookie.Expires = DateTime.Today.AddDays(-1);
                    _httponContextBase.Response.SetCookie(lTokenCookie);
                }

                Log.InfoFormat("User logged out.");
            }
            catch (Exception ex)
            {
                Log.Error("Failed to clean up login session.", ex);
            }

            return new LogOutResponse { Code = ResponseCode.Success };
        }

        [Route("updatetncstatus")]
        [HttpPost]
        public virtual AcceptTermsAndConditionsResponse AcceptTermsAndConditions()
        {
            try
            {
                if (_httponContextBase.Request.Cookies["rTC"] != null)
                {
                    var hasReadTermsCookie = _httponContextBase.Request.Cookies["rTC"];
                    hasReadTermsCookie.Expires = DateTime.Today.AddDays(-1);
                    _httponContextBase.Response.SetCookie(hasReadTermsCookie);
                }

                _accountApiProxy.UpdateTnC(CultureCode, _userContext.UserId);
                
                return new AcceptTermsAndConditionsResponse { Code = ResponseCode.Success };
            }
            catch (TermsAndConditionsNotAcceptedException ex)
            {
                return new AcceptTermsAndConditionsResponse { Code = ResponseCode.TermsNotAccepted, ErrorMessage = ex.Message };
            }
        }

        #region private method(s)

        private LogInResponse GetLogInResponse(LogInRequest request, string ipAddress, ResponseCode responseCode,
            Exception ex)
        {
            LogFailedLogin(request, ipAddress, ex);
            return new LogInResponse
            {
                Code = responseCode,
                ErrorMessage = ex.Message
            };
        }

        private void LogFailedLogin(LogInRequest request, string ipAddress, Exception ex)
        {
            Log.Error(string.Format("User {0} failed to log in from {1}", request.Username, ipAddress), ex);
        }

        #endregion private method(s)
    }
}