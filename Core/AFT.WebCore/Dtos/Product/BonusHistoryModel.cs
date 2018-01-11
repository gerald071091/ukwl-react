using System;

namespace AFT.WebCore.Dtos.Product
{
    public class BonusHistoryModel
    {
        public string Code { get; set; }

        public string Description { get; set; }

        public string Product { get; set; }

        public decimal Amount { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string Status { get; set; }
    }
}