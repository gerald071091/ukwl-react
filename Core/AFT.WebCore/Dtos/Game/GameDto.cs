using System.Collections.Generic;
using AFT.RegoApi.Proxy.Dtos;

namespace AFT.WebCore.Dtos
{
    public class GetGameListResponses : ApiResponse
    {
        public List<GameDto> GameList { get; set; }
    }
    
}
