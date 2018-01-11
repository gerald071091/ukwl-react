namespace AFT.WebCore.Dtos.Utility
{
    public class GetCountriesResponse : ApiResponse
    {
        public CountriesModel[] Countries { get; set; }
    }
}