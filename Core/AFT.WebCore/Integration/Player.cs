using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Integration
{
    public class Player
    {
        private readonly IAccountApiProxy _accountApiProxy;
        private readonly CultureUtility _cultureUtility;
        private readonly UserContext _userContext;

        private MyDetailsDto _myDetails;

        public Player(IAccountApiProxy accountApiProxy, CultureUtility cultureUtility, UserContext userContext)
        {
            _accountApiProxy = accountApiProxy;
            _cultureUtility = cultureUtility;
            _userContext = userContext;
        }

        public string Username
        {
            get { return _userContext.Username; }
        }

        public MyDetails Details
        {
            get
            {
                if (_myDetails == null)
                {
                    _myDetails = _accountApiProxy.GetMyDetails(_cultureUtility.GetCultureCode(), _userContext.UserId);
                }

                return new MyDetails(_myDetails);
            }
        }
    }
}
