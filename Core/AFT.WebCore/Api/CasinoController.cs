using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Casino;
using AFT.WebCore.Dtos.Casino.Amaya;
using AFT.WebCore.Dtos.Casino.FiftyFifty;
using AFT.WebCore.Dtos.Casino.MultiSlot;
using AFT.WebCore.Dtos.Casino.QuickFire;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;
using AFT.WebCore.Dtos.Casino.TGP;

using WebApi.OutputCache.V2;
using AFT.RegoApi.Proxy.Exceptions;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    [UserAgentLog]
    public class CasinoController : ApiBase
    {
        #region private field(s)

        private readonly ICasinoApiProxy _casinoApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;

        #endregion private field(s)

        public CasinoController(ICasinoApiProxy casinoApiProxy, IUtilityApiProxy utilityApiProxy, UserContext userContext, NetworkUtility networkUtility)
        {
            Contract.Requires(casinoApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);

            _casinoApiProxy = casinoApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
        }

        //<summary>
        //New GameList
        //</summary>
        //<returns></returns>
        [CacheOutput(ClientTimeSpan = 1800, ServerTimeSpan = 1800, ExcludeQueryStringFromCacheKey = true)]
        [Route("casino/games")]
        [HttpGet]
        [AllowAnonymous]
        public GetGameListResponse GetGameList()
        {
            var games = _casinoApiProxy.GetGameList(CultureCode);
            IDictionary<ProductIds, bool> list = new Dictionary<ProductIds, bool>();
            return new GetGameListResponse
            {
                Code = ResponseCode.Success,
                Games = from game in games
                        let productId = (ProductIds)int.Parse(game.VendorId)
                        select new GameModel
                        {
                            Id = game.Fid,
                            SubGameId = game.SubGameId,
                            Name = CultureCode == "en-gb" ? game.EnGameName : game.CnGameName,
                            CategoryId = game.CategoryId,
                            CategoryName = CultureCode == "en-gb" ? game.EnCategory : game.CnCategory,
                            VendorName = ProductMapping.ReverseMappings[productId],
                            VendorId = productId,
                            VendorGameType = game.VendorGameType,
                            LaunchGameId = game.LaunchGameId,
                            LaunchGameType = game.LaunchGameType,
                            ImageSrc = game.ImageSrc,
                            Platform = (GameEnums)int.Parse(game.Platform),
                            OrderNumber = game.DisplayOrder,
                            CategoryOrderNumber = game.CategoryDisplayOrder,
                            Status = true //GetGameStatus(productId, ref list)
                        }
            };
        }

        #region amaya

        [Route("casino/amaya/{category}/{name}/url")]
        [Route("casino/amaya-games/{category}/{name}/url")]
        [Route("casino/amaya/games/{category}/{name}/url")]
        [Route("casino/amaya/games/url")]
        [HttpGet]
        [AllowAnonymous]
        public GetAmayaGamesUrlResponse GetAmayaGamesUrl(string category = null, string name = null)
        {
            var ipAddress = _networkUtility.GetClientIPAddress();

            var url = _userContext.LoggedIn
                ? _casinoApiProxy.GetAmayaGameUrl(CultureCode, _userContext.UserId, ipAddress, category, name)
                : _casinoApiProxy.GetAmayaGameUrl(CultureCode, ipAddress, category, name);

            return new GetAmayaGamesUrlResponse
            {
                Code = ResponseCode.Success,
                FreeGameUrl = url.Free,
                RealGameUrl = url.Real
            };
        }

        [Route("casino/new/amaya/games/url")]
        [HttpGet]
        [AllowAnonymous]
        public GetAmayaGamesUrlResponse GetAmayaGamesUrl(string id, string gameId, string category, string vendorGameType)
        {

            var url = _userContext.LoggedIn
                ? _casinoApiProxy.GetAmayaGameUrl(CultureCode, _userContext.UserId, id, gameId, category, vendorGameType)
                : _casinoApiProxy.GetAmayaGameUrl(CultureCode, id, gameId, category, vendorGameType);

            return new GetAmayaGamesUrlResponse
            {
                Code = ResponseCode.Success,
                FreeGameUrl = url.Free,
                RealGameUrl = url.Real
            };
        }

        #endregion amaya

        #region multislot

        [Route("casino/multislot/{gameId:int}/free-url")]
        [Route("casino/multislot-games/{gameId:int}/free-url")]
        [Route("casino/multislot/games/{gameId:int}/free-url")]
        [Route("casino/multislot/games/free-url")]
        [Route("~/mapi/{culture}/casino/multislot/games/free-url")]
        [HttpGet]
        [AllowAnonymous]
        public GetMultiSlotFreeGameUrlResponse GetMultiSlotFreeGameUrl(int gameId = 0)
        {
            MultiSlotGameUrlDto gameUrl = _casinoApiProxy.GetMultiSlotFreeGameUrl(CultureCode, gameId,
                _networkUtility.GetClientIPAddress());

            if (gameUrl == null)
            {
                return new GetMultiSlotFreeGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetMultiSlotFreeGameUrlResponse
            {
                Code = ResponseCode.Success,
                Game = new MultiSlotGameUrlModel
                {
                    Url = gameUrl.Url,
                    Token = gameUrl.Token,
                    Guid = gameUrl.Guid,
                    GameId = gameUrl.GameId,
                    Language = gameUrl.Language,
                    AccountId = -1
                }
            };
        }

        [Route("casino/multislot/{gameId:int}/real-url")]
        [Route("casino/multislot-games/{gameId:int}/real-url")]
        [Route("casino/multislot/games/{gameId:int}/real-url")]
        [Route("casino/multislot/games/real-url")]
        [Route("~/mapi/{culture}/casino/multislot/games/real-url")]
        [HttpGet]
        public GetMultiSlotRealGameUrlResponse GetMultiSlotRealGameUrl(int gameId = 0)
        {
            try
            {
                //if (!UserCanUseMultiSlot())
                //{
                //    return new GetMultiSlotRealGameUrlResponse { Code = ResponseCode.ProductNotAvailable };
                //}

                var gameUrl = _casinoApiProxy.GetMultiSlotRealGameUrl(CultureCode, _userContext.UserId, gameId,
                    _networkUtility.GetClientIPAddress());

                //if (gameUrl == null)
                //{
                //    return new GetMultiSlotRealGameUrlResponse { Code = ResponseCode.UrlNotFound };
                //}

                return new GetMultiSlotRealGameUrlResponse
                {
                    Code = ResponseCode.Success,
                    Game = new MultiSlotGameUrlModel
                    {
                        Url = gameUrl.Url,
                        Token = gameUrl.Token,
                        Guid = gameUrl.Guid,
                        GameId = gameUrl.GameId,
                        Language = gameUrl.Language,
                        AccountId = 1
                    }
                };
            }
            catch (RealGameUrlException ex)
            {
                return new GetMultiSlotRealGameUrlResponse { Code = ResponseCode.InvalidPlayerStatus, ErrorMessage = ex.Message };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new GetMultiSlotRealGameUrlResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }

        }

        #endregion multislot

        #region quickfire

        [Route("casino/microgaming/quickfire/{gameId}/free-url")]
        [HttpGet]
        [AllowAnonymous]
        public GetQuickFireGameUrlResponse GetQuickFireFreeGameUrl(string gameId = null, string lobbyUrl = null)
        {
            var url = _casinoApiProxy.GetQuickFireFreeGameUrl(CultureCode, gameId, lobbyUrl);

            if (url == null)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetQuickFireGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        [Route("casino/microgaming/quickfire/{gameId}/real-url")]
        [HttpGet]
        public GetQuickFireGameUrlResponse GetQuickFireRealGameUrl(string gameId = null, string lobbyUrl = null)
        {
            try
            {
                var url = _casinoApiProxy.GetQuickFireRealGameUrl(CultureCode, _userContext.UserId, gameId, lobbyUrl);

                //if (url == null)
                //{
                //    return new GetQuickFireGameUrlResponse { Code = ResponseCode.UrlNotFound };
                //}

                return new GetQuickFireGameUrlResponse
                {
                    Code = ResponseCode.Success,
                    Url = url
                };
            }
            catch (RealGameUrlException ex)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.InvalidPlayerStatus, ErrorMessage = ex.Message };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }

        }

        [Route("~/mapi/{culture}/casino/microgaming/quickfire/{gameId}/free-url")]
        [HttpGet]
        [AllowAnonymous]
        public GetQuickFireGameUrlResponse GetQuickFireMobileFreeGameUrl(string gameId = null, string lobbyUrl = null)
        {
            var url = _casinoApiProxy.GetQuickFireMobileFreeGameUrl(CultureCode, gameId, lobbyUrl);

            if (url == null)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetQuickFireGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        [Route("~/mapi/{culture}/casino/microgaming/quickfire/{gameId}/real-url")]
        [HttpGet]
        public GetQuickFireGameUrlResponse GetQuickFireMobileRealGameUrl(string gameId = null, string lobbyUrl = null)
        {
            try
            {
                var url = _casinoApiProxy.GetQuickFireMobileRealGameUrl(CultureCode, _userContext.UserId, gameId, lobbyUrl);

                //if (url == null)
                //{
                //    return new GetQuickFireGameUrlResponse { Code = ResponseCode.UrlNotFound };
                //}

                return new GetQuickFireGameUrlResponse
                {
                    Code = ResponseCode.Success,
                    Url = url
                };
            }
            catch (RealGameUrlException ex)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.InvalidPlayerStatus, ErrorMessage = ex.Message };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new GetQuickFireGameUrlResponse { Code = ResponseCode.BrokenApiProxy, ErrorMessage = ex.Message };
            }

        }

        #endregion quickfire

        #region realsports

        [Route("casino/realsports/5050-pro/{gameId}/url")]
        [Route("casino/realsports/games/5050/pro/{gameId}/url")]
        [Route("casino/realsports/games/5050/pro/url")]
        [Route("casino/realsports/games/5050pro/url")]
        [HttpGet]
        [Authorize]
        public Get5050ProGameUrlResponse Get5050ProGameUrl(string gameId = null)
        {
            return Get5050ProGameUrl(gameId, false);
        }

        [Route("~/mapi/{culture}/casino/realsports/5050-pro/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/pro/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/pro/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050pro/url")]
        [HttpGet]
        [Authorize]
        public Get5050ProGameUrlResponse Get5050ProMobileGameUrl(string gameId = null)
        {
            return Get5050ProGameUrl(gameId, true);
        }

        [Route("casino/realsports/5050-scratch-card/{gameId}/url")]
        [Route("casino/realsports/games/5050/scratch-card/{gameId}/url")]
        [Route("casino/realsports/games/5050/scratch-card/url")]
        [Route("casino/realsports/games/scratch/url")]
        [HttpGet]
        [Authorize]
        public Get5050ScratchCardGameUrlResponse Get5050ScratchCardGameUrl(string gameId = null)
        {
            return Get5050ScratchCardGameUrl(gameId, false);
        }

        [Route("~/mapi/{culture}/casino/realsports/5050-scratch-card/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/scratch-card/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/scratch-card/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/scratch/url")]
        [HttpGet]
        [Authorize]
        public Get5050ScratchCardGameUrlResponse Get5050ScratchCardMobileGameUrl(string gameId = null)
        {
            return Get5050ScratchCardGameUrl(gameId, true);
        }

        [Route("casino/realsports/5050-sports/{gameId}/url")]
        [Route("casino/realsports/games/5050/sports/{gameId}/url")]
        [Route("casino/realsports/games/5050/sports/url")]
        [Route("casino/realsports/games/5050sports/url")]
        [HttpGet]
        [Authorize]
        public Get5050SportsGameUrlResponse Get5050SportsGameUrl(string gameId)
        {
            return Get5050SportsGameUrl(gameId, false);
        }

        [Route("~/mapi/{culture}/casino/realsports/5050-sports/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/sports/{gameId}/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050/sports/url")]
        [Route("~/mapi/{culture}/casino/realsports/games/5050sports/url")]
        [HttpGet]
        [Authorize]
        public Get5050SportsGameUrlResponse Get5050SportsMobileGameUrl(string gameId)
        {
            return Get5050SportsGameUrl(gameId, true);
        }

        public Get5050SportsGameUrlResponse Get5050SportsGameUrl(string gameId, bool isMobile)
        {
            var url = _casinoApiProxy.Get5050SportsGameUrl(CultureCode, gameId, _networkUtility.GetClientIPAddress(),
                isMobile);

            if (url == null)
            {
                return new Get5050SportsGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new Get5050SportsGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        [Route("casino/realsports/5050-sports-mini/url")]
        [Route("casino/realsports/games/5050/sports-mini/url")]
        [HttpGet]
        [Authorize]
        public Get5050SportsMiniGameUrlResponse Get5050SportsMiniGameUrl()
        {
            var url = _casinoApiProxy.Get5050SportsMiniGameUrl(CultureCode, _userContext.UserId,
                _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new Get5050SportsMiniGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new Get5050SportsMiniGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #endregion realsports

        #region game history

        [Route("products/{product}/game-histories")]
        [HttpGet]
        [ValidateProduct]
        public GetGameHistoryResponse GetGameHistory(string product, DateTime from, DateTime to, int page = 1, int pageSize = 10)
        {
            var games = _casinoApiProxy.GetGameHistory(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product], from, to);

            return new GetGameHistoryResponse
            {
                Code = ResponseCode.Success,
                TotalNumber = games.Count,
                TotalBetAmount = games.Sum(game => game.BetAmount),
                TotalBetCount = games.Sum(game => game.BetCount),
                TotalWinLoss = games.Sum(game => game.WinLoss),
                Histories = games.Skip((page - 1) * pageSize).Take(pageSize).Select(game => new GameHistoryModel
                {
                    Name = game.Name,
                    BetCount = game.BetCount,
                    BetAmount = game.BetAmount,
                    BetDate = game.BetDate,
                    WinLoss = game.WinLoss
                }).ToArray()
            };
        }

        #endregion game history

        #region ugs

        [Route("casino/tgp/getugsurl")]
        [HttpGet]
        [Authorize]
        public GetTGPGameUrlResponse GetTGPGameUrl()
        {
            var url = _casinoApiProxy.GetUGSGameUrl(CultureCode, _userContext.UserId,
                _networkUtility.GetClientIPAddress());

            if (url == null)
            {
                return new GetTGPGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetTGPGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        [Route("casino/tgp/{gameType}/{gameId}/{platform}/getugssingleurl")]
        [HttpGet]
        [Authorize]
        public GetTGPGameUrlResponse GetTGPSingleGameUrl(string gameType, string gameId, string platform)
        {
            var url = _casinoApiProxy.GetUGSSingleGameUrl(CultureCode, _userContext.UserId,
                _networkUtility.GetClientIPAddress(), gameType, gameId, platform);

            if (url == null)
            {
                return new GetTGPGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new GetTGPGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #endregion ugs

        #region private method(s)

        private bool UserCanUseMultiSlot()
        {
            return _utilityApiProxy.CanUserUseProduct(CultureCode, _userContext.UserId, ProductIds.Multislot);
        }

        private Get5050ProGameUrlResponse Get5050ProGameUrl(string gameId, bool isMobile)
        {
            var url = _casinoApiProxy.Get5050ProGameUrl(CultureCode, gameId, _networkUtility.GetClientIPAddress(), isMobile);

            if (url == null)
            {
                return new Get5050ProGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new Get5050ProGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        private Get5050ScratchCardGameUrlResponse Get5050ScratchCardGameUrl(string gameId, bool isMobile)
        {
            var url = _casinoApiProxy.Get5050ScratchCardGameUrl(CultureCode, gameId,
                _networkUtility.GetClientIPAddress(), isMobile);

            if (url == null)
            {
                return new Get5050ScratchCardGameUrlResponse { Code = ResponseCode.UrlNotFound };
            }

            return new Get5050ScratchCardGameUrlResponse
            {
                Code = ResponseCode.Success,
                Url = url
            };
        }

        #endregion private method(s)

        [Route("casino/gamesRtp")]
        [HttpGet]
        [AllowAnonymous]
        public GetGamesRtpResponse GetRTPList()
        {
            var gamesRtp = _casinoApiProxy.GetRTPList(CultureCode);

            return new GetGamesRtpResponse
            {
                Code = ResponseCode.Success,
                GameRtp = gamesRtp.ToList().AsReadOnly()
            };
        }
    }
}