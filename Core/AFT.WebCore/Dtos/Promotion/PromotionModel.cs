using System;

namespace AFT.WebCore.Dtos.Promotion
{
    public class PromotionModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string BonusCode { get; set; }

        public decimal Order { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string DisplayName { get; set; }

        public string ImageUrl { get; set; }

        public string BigImageUrl { get; set; }

        public string Summary { get; set; }

        public string Terms { get; set; }
    }
}