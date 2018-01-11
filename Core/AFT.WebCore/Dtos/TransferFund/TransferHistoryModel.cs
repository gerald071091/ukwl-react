using System;
using AFT.RegoApi.Proxy;

namespace AFT.WebCore.Dtos.TransferFund
{
    public class TransferHistoryModel
    {
        public string Code { get; set; }

        public ProductIds ProductId { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; }
    }
}