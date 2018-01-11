using System.Collections.Generic;

namespace AFT.WebCore.Dtos.TransferFund
{
    public class GetMicrogamingWalletHistoryResponse : HistoryApiResponse<TransferHistoryModel>
    {
        public new TransferHistoryModel[] Histories { get; set; }
    }
}