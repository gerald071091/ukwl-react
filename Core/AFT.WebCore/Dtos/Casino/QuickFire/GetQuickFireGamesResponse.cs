namespace AFT.WebCore.Dtos.Casino.QuickFire
{
    public class GetQuickFireGamesResponse : ApiResponse
    {
        public QuickFireGameModel[] Games { get; set; }
    }
}