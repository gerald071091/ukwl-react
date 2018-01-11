using System;

namespace AFT.WebCore.Dtos.Casino.Amaya
{
    public class GetAmayaGamesUrlResponse : ApiResponse
    {
        public Uri FreeGameUrl { get; set; }

        public Uri RealGameUrl { get; set; }
    }
}