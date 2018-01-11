using System.Diagnostics.Contracts;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Sportsbook;
using AFT.WebCore.Filters;
using AFT.RegoApi.Proxy.Exceptions;

namespace AFT.WebCore.Api
{
    public class SportsbookController : ApiBase
    {
        #region private field(s)

        private readonly ISportsbookApiProxy _sportsbookApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly UserContext _userContext;

        #endregion private field(s)

        public SportsbookController(ISportsbookApiProxy sportsbookApiProxy, IUtilityApiProxy utilityApiProxy, UserContext userContext)
        {
            Contract.Requires(sportsbookApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);

            _sportsbookApiProxy = sportsbookApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
        }

        [Route("api/{culture}/sbtech/url")]
        [HttpGet]
        [AllowAnonymous]
        [UserAgentLog]
        public virtual GetSbTechUrlResponse GetSbTechUrl()
        {
            Log.Info("Getting Sportsbook URL.");

            if (!UserCanUseProduct())
            {
                return new GetSbTechUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            return new GetSbTechUrlResponse
            {
                Code = ResponseCode.Success,
                Url =
                    _userContext.LoggedIn
                        ? _sportsbookApiProxy.GetSbTechUrl(CultureCode, _userContext.Username)
                        : _sportsbookApiProxy.GetSbTechUrl(CultureCode)
            };
        }

        [Route("mapi/{culture}/sbtech/url")]
        [HttpGet]
        [AllowAnonymous]
        [UserAgentLog]
        public virtual GetSbTechMobileUrlResponse GetSbTechMobileUrl()
        {
            Log.Info("Getting Sportsbook mobile URL.");

            if (!UserCanUseProduct())
            {
                return new GetSbTechMobileUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            return new GetSbTechMobileUrlResponse
            {
                Code = ResponseCode.Success,
                Url =
                    _userContext.LoggedIn
                        ? _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode, _userContext.Username)
                        : _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode)
            };
        }

        [Route("api/{culture}/sbtech/url")]
        [HttpGet]
        [AllowAnonymous, SuppressCsrfProtection]
        [UserAgentLog]
        public virtual HttpResponseMessage GetSbTechCallbackUrl([FromUri]string callback)
        {
            Log.Info("Sportsbook timed out. Getting Sportsbook URL again.");

            // don't use optional parameter to prevent routing conflict
            if (string.IsNullOrWhiteSpace(callback))
            {
                callback = "jsoncb";
            }

            return JsonpResponse(callback + "({url:'" + (
                    _userContext.LoggedIn
                        ? _sportsbookApiProxy.GetSbTechUrl(CultureCode, _userContext.Username)
                        : _sportsbookApiProxy.GetSbTechUrl(CultureCode)
            ) + "'})");
        }

        [Route("mapi/{culture}/sbtech/url")]
        [HttpGet]
        [AllowAnonymous, SuppressCsrfProtection]
        [UserAgentLog]
        public virtual HttpResponseMessage GetSbTechCallbackMobileUrl([FromUri]string callback)
        {
            Log.Info("Sportsbook timed out. Getting Sportsbook mobile URL again.");

            // don't use optional parameter to prevent routing conflict
            if (string.IsNullOrWhiteSpace(callback))
            {
                callback = "jsoncb";
            }

            return JsonpResponse(callback + "({url:'" + (
                    _userContext.LoggedIn
                        ? _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode, _userContext.Username)
                        : _sportsbookApiProxy.GetSbTechMobileUrl(CultureCode)
            ) + "'})");
        }

        [Route("api/{culture}/sbtech/status")]
        [Route("mapi/{culture}/sbtech/status")]
        [HttpGet]
        [AllowAnonymous, SuppressCsrfProtection]
        [UserAgentLog]
        public HttpResponseMessage GetSbTechStatus()
        {
            Log.Info("Getting Sportsbook user status.");

            return
                JsonpResponse(_userContext.LoggedIn
                    ? _sportsbookApiProxy.GetSbTechStatus(CultureCode, _userContext.UserId, _userContext.Username,
                        _userContext.Currency)
                    : _sportsbookApiProxy.GetSbTechStatus(CultureCode));
        }

        [Route("api/{culture}/sbtech/session")]
        [Route("mapi/{culture}/sbtech/session")]
        [HttpGet]
        [AllowAnonymous, SuppressCsrfProtection]
        [UserAgentLog]
        public HttpResponseMessage GetSbTechRefreshSession()
        {
            Log.Info("Refreshing Sportsbook user session.");

            return
                JsonpResponse(_userContext.LoggedIn
                    ? _sportsbookApiProxy.GetSbTechRefreshSession(CultureCode, _userContext.UserId,
                        _userContext.Currency)
                    : _sportsbookApiProxy.GetSbTechRefreshSession(CultureCode));
        }

		[Route("api/{culture}/sbtech/mapping")]
		[Route("mapi/{culture}/sbtech/mapping")]
		[HttpPost]
		[AllowAnonymous, SuppressCsrfProtection]
		[UserAgentLog]
		public GetSbTechMobileMappingResponse GetSbTechMobileMapping([FromBody]GetSbTechMobileMappingRequest request)
		{
			try
			{
				var response = _sportsbookApiProxy.GetSBTechMobileMapping(CultureCode, request.SettingName);

				if (!UserCanUseProduct())
				{
					return new GetSbTechMobileMappingResponse { Code = ResponseCode.ProductNotAvailable };
				}

				if (response == null)
				{
					return new GetSbTechMobileMappingResponse { Code = ResponseCode.MappingNotValid };
				}

				return new GetSbTechMobileMappingResponse
				{
					Code = ResponseCode.Success,
					Value = response
				};
			}
			catch (ApiProxyBrokenException ex)
			{
				return new GetSbTechMobileMappingResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
			}

		}

		#region private method(s)

		private static HttpResponseMessage JsonpResponse(string content)
        {
            var response = new HttpResponseMessage
            {
                Content = new StringContent(content)
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/javascript");

            return response;
        }

        private bool UserCanUseProduct()
        {
            return !_userContext.LoggedIn ||
                   _utilityApiProxy.CanUserUseProduct(CultureCode, _userContext.UserId, ProductIds.SBTech);
        }

        #endregion private method(s)
    }
}