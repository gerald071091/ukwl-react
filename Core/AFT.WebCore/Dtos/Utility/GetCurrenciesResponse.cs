namespace AFT.WebCore.Dtos.Utility
{
    public class GetCurrenciesResponse : ApiResponse
    {
        public CurrenciesModel[] Currencies { get; set; }
    }
}