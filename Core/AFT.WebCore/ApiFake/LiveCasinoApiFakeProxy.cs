using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class LiveCasinoApiFakeProxy : ILiveCasinoApiProxy
    {
        public Uri GetEmeraldRoomUrl(string cultureCode, Guid userId, string ipAddress)
        {
            throw new NotImplementedException();
        }

        public Uri GetGoldRoomUrl(string cultureCode, Guid userId, string ipAddress)
        {
            throw new NotImplementedException();
        }
        public Uri GetQuickFireLiveDealerUrl(string cultureCode, Guid userId, string gameId, string ipAddress)
        {
            return new Uri("https://www.jenningsbet.com");
        }
        public ReadOnlyCollection<QuickFireLiveDealerGameDto> GetQuickFireLiveDealerGames(string cultureCode)
        {
            var categories = new[] { "Baccarat", "Roulette", "BlackJack" };
            var lst = new List<QuickFireLiveDealerGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 5; i++)
            {
                var category = categories[rnd.Next(1, 100) % categories.Length];
                lst.Add(new QuickFireLiveDealerGameDto
                {
                    ImageUrl = "quickfire_livedealer/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    GameNameEn = "Live QuickFire Name " + i.ToString("00"),
                    SubGameId = category + i
                });
            }

            return new ReadOnlyCollection<QuickFireLiveDealerGameDto>(lst);
        }

        Uri ILiveCasinoApiProxy.GetEmeraldRoomUrl(string cultureCode, Guid userId, string ipAddress)
        {
            throw new NotImplementedException();
        }

        Uri ILiveCasinoApiProxy.GetGoldRoomUrl(string cultureCode, Guid userId, string ipAddress)
        {
            throw new NotImplementedException();
        }

        ReadOnlyCollection<QuickFireLiveDealerGameDto> ILiveCasinoApiProxy.GetQuickFireLiveDealerGames(string cultureCode)
        {
            throw new NotImplementedException();
        }

        Uri ILiveCasinoApiProxy.GetQuickFireLiveDealerUrl(string cultureCode, Guid userId, string gameId, string ipAddress)
        {
            throw new NotImplementedException();
        }


        Uri ILiveCasinoApiProxy.GetGoldDeluxeLiveDealerUrl(string cultureCode, Guid userId, string ipAddress, string isMobile)
        {
            throw new NotImplementedException();
        }
    }
}
