using System.Diagnostics.Contracts;
using System.Web.Http;
using AFT.RegoCMS.Data;
using AFT.RegoCMS.WhiteLabel.Api;
using AFT.RegoCMS.WhiteLabel.Dtos;

namespace AFT.RegoCMS.WhiteLabel.Cms
{
    [RoutePrefix("api/{culture}")]
    public class GameController : ApiBase
    {
        private readonly GameListManager _gameListManager;

        public GameController(GameListManager gameListManager)
        {
            Contract.Requires(gameListManager != null);

            _gameListManager = gameListManager;
        }

        [HttpGet, Route("gamelist")]
        [AllowAnonymous]
        public virtual GetGameListResponses GetGameList(out int outCount, GetGameListRequest list)
        {
   
            var items = _gameListManager.GetGames(out outCount, list, CultureCode);
            
            return new GetGameListResponses
            {
                Code = ResponseCode.Success,
                GameList = items
            };

        }
    }
}
