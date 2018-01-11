namespace AFT.WebCore.Dtos.Product
{
    public class GetAvailableBalanceResponse : ApiResponse
    {
        public decimal Balance { get; set; }

        public bool HasBonus { get; set; }
    }
}