namespace AFT.WebCore.Dtos.Casino
{
    public class GetGameHistoryResponse : HistoryApiResponse<GameHistoryModel>
    {
        public decimal TotalBetCount { get; set; }
        public decimal TotalBetAmount { get; set; }
        public decimal TotalWinLoss { get; set; }
    }
}