namespace AFT.WebCore.Dtos.TransferFund
{
    public class GetMainWalletHistoryResponse : HistoryApiResponse<TransferHistoryModel>
    {
        public new TransferHistoryModel[] Histories { get; set; }
    }
}