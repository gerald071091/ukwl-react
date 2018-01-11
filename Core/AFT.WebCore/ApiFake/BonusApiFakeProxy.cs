using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class BonusApiFakeProxy : IBonusApiProxy
    {
        public void ClaimBonus(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId, string bonusCode)
        {
            //throw new NotImplementedException();
        }

        public ReadOnlyCollection<BonusHistoryDto> GetBonusHistory(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId, RegoApi.Proxy.BonusStatus status, DateTime from, DateTime to)
        {
            var lst = new List<BonusHistoryDto>();

            for (var i = 0; i < new Random().Next(10, 30); i++)
            {
                lst.Add(new BonusHistoryDto
                {
                    BonusAmount = new Decimal(new Random().Next(10, 300)),
                    BonusCode = Guid.NewGuid().ToString(),
                    Description = "description",
                    ExpiryDate = DateTime.Now.AddDays(1),
                    ProductName = "product name",
                    Status = "status"
                });
            }

            return new ReadOnlyCollection<BonusHistoryDto>(lst);

        }
    }
}
