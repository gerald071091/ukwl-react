namespace AFT.WebCore.Dtos.Product
{
    public class GetWalletBalanceResponse : ApiResponse
    {
        public decimal Balance { get; set; }

        public bool HasBonus { get; set; }
    }
}