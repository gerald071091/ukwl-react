using System.Diagnostics.Contracts;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.FinancialBetting;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    public class FinancialBettingController : ApiBase
    {
        #region private field(s)

        private readonly IFinancialBettingApiProxy _financialBettingApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;

        #endregion private field(s)

        public FinancialBettingController(IFinancialBettingApiProxy financialBettingApiProxy, IUtilityApiProxy utilityApiProxy, NetworkUtility networkUtility, UserContext userContext)
        {
            Contract.Requires(financialBettingApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);

            _financialBettingApiProxy = financialBettingApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
        }

        [Route("api/{culture}/spotoption/url")]
        [HttpGet]
        [AllowAnonymous]
        public virtual GetSpotOptionUrlResponse GetSpotOptionUrl()
        {
            if (!UserCanUseProduct())
            {
                return new GetSpotOptionUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            var url = _financialBettingApiProxy.GetSpotOptionUrl(CultureCode, _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new GetSpotOptionUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetSpotOptionUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #region private method(s)

        private bool UserCanUseProduct()
        {
            return !_userContext.LoggedIn ||
                   _utilityApiProxy.CanUserUseProduct(CultureCode, _userContext.UserId, ProductIds.FinancialBetting);
        }

        #endregion private method(s)
    }
}