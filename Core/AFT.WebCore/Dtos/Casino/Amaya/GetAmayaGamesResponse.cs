namespace AFT.WebCore.Dtos.Casino.Amaya
{
    public class GetAmayaGamesResponse : ApiResponse
    {
        public AmayaGameModel[] Games { get; set; }
    }
}