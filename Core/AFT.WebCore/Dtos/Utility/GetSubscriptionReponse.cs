namespace AFT.WebCore.Dtos.Utility
{
    public class GetSubscriptionReponse : ApiResponse
    {
        public SubscribeModel Subscription { get; set; }

        public class SubscribeModel
        {
            public bool Email { get; set; }
            public bool SMS { get; set; }
            public bool Post { get; set; }
        }
    }
}
