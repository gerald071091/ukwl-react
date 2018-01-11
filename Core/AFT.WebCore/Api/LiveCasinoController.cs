using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.LiveCasino;
using AFT.WebCore.Dtos.LiveCasino.QuickFire;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}/live-casino")]
    [UserAgentLog]
    public class LiveCasinoController : ApiBase
    {
        #region private field(s)

        private readonly ILiveCasinoApiProxy _liveCasinoApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;

        #endregion private field(s)

        public LiveCasinoController(ILiveCasinoApiProxy liveCasinoApiProxy, IUtilityApiProxy utilityApiProxy, UserContext userContext, NetworkUtility networkUtility)
        {
            Contract.Requires(liveCasinoApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);

            _liveCasinoApiProxy = liveCasinoApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
        }

        #region Amaya Games

        [Obsolete]
        [Route("emerald-room")]
        [HttpGet]
        public virtual GetEmeraldRoomUrlResponse GetEmeraldRoomUrl()
        {
            if (!UserCanUseProduct())
            {
                return new GetEmeraldRoomUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            var url = _liveCasinoApiProxy.GetEmeraldRoomUrl(CultureCode, _userContext.UserId,
                _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new GetEmeraldRoomUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetEmeraldRoomUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        [Obsolete]
        [Route("gold-room")]
        [HttpGet]
        public virtual GetGoldRoomUrlResponse GetGoldRoomUrl()
        {
            if (!UserCanUseProduct())
            {
                return new GetGoldRoomUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            var url = _liveCasinoApiProxy.GetGoldRoomUrl(CultureCode, _userContext.UserId,
                _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new GetGoldRoomUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetGoldRoomUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #endregion Amaya Games

        #region Micro Gaming Games

        #region Quick Fire Games

        [Route("microgaming/quickfire/games")]
        [HttpGet]
        [AllowAnonymous]
        public GetQuickFireLiveDealerGameListResponse GetQuickFireLiveDealerGames()
        {
            return new GetQuickFireLiveDealerGameListResponse
            {
                Code = ResponseCode.Success,
                Games = _liveCasinoApiProxy.GetQuickFireLiveDealerGames(CultureCode).Select(game => new QuickFireLiveDealerGameModel()
                {
                    GameNameEn = game.GameNameEn,
                    GameNameCn = game.GameNameCn,
                    SubGameId = game.SubGameId,
                    ImageUrl = game.ImageUrl
                }).ToArray()
            };
        }

        [Route("microgaming/quickfire/games/{gameId}")]
        [Route("microgaming/quickfire/games/url")]
        [HttpGet]
        public virtual GetQuickFireLiveDealerUrlResponse GetQuickFireLiveDealerUrl(string gameId = null)
        {
            if (!UserCanUseProduct())
            {
                return new GetQuickFireLiveDealerUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            var url = _liveCasinoApiProxy.GetQuickFireLiveDealerUrl(CultureCode, _userContext.UserId, gameId,
                _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new GetQuickFireLiveDealerUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetQuickFireLiveDealerUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #endregion Quick Fire Games

        #endregion Micro Gaming Games

        #region GoldDeluxe Live Casino

        [Route("golddeluxe/url")]
        [HttpGet]
        public virtual GetGoldDeluxeLiveDealerUrlResponse GetGoldDeluxeLiveDealerUrl(string isMobile="false")
        {
            if (!UserCanUseProduct())
            {
                return new GetGoldDeluxeLiveDealerUrlResponse { Code = ResponseCode.ProductNotAvailable };
            }

            var url = _liveCasinoApiProxy.GetGoldDeluxeLiveDealerUrl(CultureCode, _userContext.UserId, _networkUtility.GetClientIPAddress(), isMobile);

            if (url == null)
            {
                return new GetGoldDeluxeLiveDealerUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetGoldDeluxeLiveDealerUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }


        #endregion GoldDeluxe Live Casino

        #region private method(s)

        private bool UserCanUseProduct()
        {
            return _utilityApiProxy.CanUserUseProduct(CultureCode, _userContext.UserId, ProductIds.MacauAndLiveCasino);
        }

        #endregion private method(s)
    }
}