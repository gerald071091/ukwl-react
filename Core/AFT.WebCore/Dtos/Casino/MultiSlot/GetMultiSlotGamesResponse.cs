namespace AFT.WebCore.Dtos.Casino.MultiSlot
{
    public class GetMultiSlotGamesResponse : ApiResponse
    {
        public MultiSlotGameModel[] Games { get; set; }
    }
}