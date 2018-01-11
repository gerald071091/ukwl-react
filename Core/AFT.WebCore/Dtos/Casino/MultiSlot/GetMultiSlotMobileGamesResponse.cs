namespace AFT.WebCore.Dtos.Casino.MultiSlot
{
    public class GetMultiSlotMobileGamesResponse : ApiResponse
    {
        public MultiSlotGameModel[] Games { get; set; }
    }
}