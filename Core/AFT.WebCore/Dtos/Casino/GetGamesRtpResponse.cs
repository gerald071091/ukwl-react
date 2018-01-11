using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AFT.RegoApi.Proxy.Dtos;

namespace AFT.WebCore.Dtos.Casino
{
    public class GetGamesRtpResponse : ApiResponse
    {
        public IReadOnlyCollection<GameRtpDto> GameRtp { get; set; }
    }
}
