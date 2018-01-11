namespace AFT.WebCore.Dtos.Product
{
    public class GetBonusHistoryResponse : HistoryApiResponse<BonusHistoryModel>
    {
        public new BonusHistoryModel[] Histories { get; set; }
    }
}