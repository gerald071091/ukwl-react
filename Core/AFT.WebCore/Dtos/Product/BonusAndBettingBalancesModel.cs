using AFT.RegoApi.Proxy;

namespace AFT.WebCore.Dtos.Product
{
    public class BonusAndBettingBalancesModel
    {
        public string Product { get; set; }

        public decimal Bonus { get; set; }

        public decimal Betting { get; set; }

        public string BonusStatus { get; set; }
    }
}