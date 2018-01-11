using System;

namespace AFT.WebCore.Dtos.Casino.MultiSlot
{
    public class MultiSlotGameUrlModel
    {
        public Uri Url { get; set; }

        public string Token { get; set; }

        public string Guid { get; set; }

        public int GameId { get; set; }

        public string Language { get; set; }

        public int AccountId { get; set; }
    }
}