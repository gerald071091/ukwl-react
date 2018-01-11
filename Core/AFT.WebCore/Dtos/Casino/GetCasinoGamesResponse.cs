using AFT.WebCore.Dtos.Casino.Amaya;
using AFT.WebCore.Dtos.Casino.FiftyFifty;
using AFT.WebCore.Dtos.Casino.MultiSlot;
using AFT.WebCore.Dtos.Casino.QuickFire;

namespace AFT.WebCore.Dtos.Casino
{
    public class GetCasinoGamesResponse : ApiResponse
    {
        public AmayaGameModel[] Amaya { get; set; }

        public MultiSlotGameModel[] MultiSlot { get; set; }

        public QuickFireGameModel[] QuickFire { get; set; }

        public FiftyFiftyGameModel[] RsgPro { get; set; }

        public FiftyFiftyGameModel[] RsgSports { get; set; }

        public FiftyFiftyGameModel[] RsgScratch { get; set; }
    }
}