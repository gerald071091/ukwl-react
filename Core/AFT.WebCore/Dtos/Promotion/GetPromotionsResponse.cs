namespace AFT.WebCore.Dtos.Promotion
{
    public class GetPromotionsResponse : ApiResponse
    {
        public PromotionModel[] Promotions { get; set; }
    }
}