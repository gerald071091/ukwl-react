using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class PromotionApiFakeProxy : IPromotionApiProxy
    {
        public PromotionDto GetPromotionByBonusCode(string cultureCode, string promotionCode)
        {
            throw new NotImplementedException();
        }

        public PromotionDto GetPromotionByPromotionId(string cultureCode, string promotionId)
        {
            return new PromotionDto
            {
                PromotionId = new Random().Next(1, 1000).ToString(CultureInfo.InvariantCulture),
                BonusCode = Guid.NewGuid().ToString().Replace("-", ""),
                DisplayName = "this is the one and only promotion item!",
                Order = 1,
                ProductName = "Produ"
            };
        }

        public ReadOnlyCollection<PromotionDto> GetPromotions(string cultureCode)
        {
            var lst = new List<PromotionDto>();

            for (var i = 0; i < new Random().Next(1, 10); i++)
            {
                lst.Add(new PromotionDto
                {
                    PromotionId = i.ToString(CultureInfo.InvariantCulture),
                    BonusCode = Guid.NewGuid().ToString().Replace("-", ""),
                    DisplayName = "Some display name",
                    Order = i,
                    ProductName = "Product name"
                });
            }

            return new ReadOnlyCollection<PromotionDto>(lst);
        }
    }
}
