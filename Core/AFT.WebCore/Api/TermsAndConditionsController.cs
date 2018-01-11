using System.Diagnostics.Contracts;
using System.Web.Http;

using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.Whitelabel.Dtos;
using AFT.Whitelabel.Dtos.TermsAndConditions;
using AFT.Whitelabel.Filters;

namespace AFT.Whitelabel.Api
{
    [RoutePrefix("api/{culture}/terms")]
    public class TermsAndConditionsController : ApiBase
    {
        #region private field(s)

        private readonly UserContext _userContext;
        private readonly ITermsAndConditionsApiProxy _termsAndConditionsApiProxy;

        #endregion private field(s)

        public TermsAndConditionsController(ITermsAndConditionsApiProxy termsAndConditionsApiProxy, UserContext userContext)
        {
            Contract.Requires(termsAndConditionsApiProxy != null);
            Contract.Requires(userContext != null);

            _termsAndConditionsApiProxy = termsAndConditionsApiProxy;
            _userContext = userContext;
        }

        [Route("accept"), HttpPost]
        [UserAgentLog]
        public virtual AcceptTermsAndConditionsResponse AcceptTermsAndConditions()
        {
            try
            {
                _termsAndConditionsApiProxy.Accept(CultureCode, _userContext.UserId);

                return new AcceptTermsAndConditionsResponse { Code = ResponseCode.Success };
            }
            catch (TermsAndConditionsNotAcceptedException ex)
            {
                return new AcceptTermsAndConditionsResponse { Code = ResponseCode.TermsNotAccepted, ErrorMessage = ex.Message };
            }
        }
    }
}