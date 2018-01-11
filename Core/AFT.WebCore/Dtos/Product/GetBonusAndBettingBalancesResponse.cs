namespace AFT.WebCore.Dtos.Product
{
    public class GetBonusAndBettingBalancesResponse : ApiResponse
    {
        public BonusAndBettingBalancesModel[] Balances { get; set; }
    }
}