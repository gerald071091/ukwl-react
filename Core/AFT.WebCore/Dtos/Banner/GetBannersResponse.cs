namespace AFT.WebCore.Dtos.Banner
{
    public class GetBannersResponse : ApiResponse
    {
        public BannerModel[] Banners { get; set; }
    }
}