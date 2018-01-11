using System;
using System.Globalization;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class CasinoApiFakeProxy : ICasinoApiProxy
    {
        public Uri Get5050ProGameUrl(string cultureCode, int gameId, string ipAddress, bool isMobile)
        {
            return new Uri("https://www.jenningsbet.com");
        }

        public ReadOnlyCollection<FiftyFiftyGameDto> Get5050ProGames(string cultureCode)
        {
            const string category = "5050Pro";
            var lst = new List<FiftyFiftyGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new FiftyFiftyGameDto
                {
                    CategoryEn = category,
                    ImageUrl = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    GameName = gameName,
                    GameNameEn = gameName,
                    SubGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<FiftyFiftyGameDto>(lst);
        }

        public Uri Get5050ScratchCardGameUrl(string cultureCode, int gameId, string ipAddress, bool isMobile)
        {
            return new Uri("https://www.jenningsbet.com");
        }

        public ReadOnlyCollection<FiftyFiftyGameDto> Get5050ScratchCardGames(string cultureCode)
        {
            const string category = "Scratch Card";
            var lst = new List<FiftyFiftyGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new FiftyFiftyGameDto
                {
                    CategoryEn = category,
                    ImageUrl = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    GameName = gameName,
                    GameNameEn = gameName,
                    SubGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<FiftyFiftyGameDto>(lst);
        }

        public Uri Get5050SportsGameUrl(string cultureCode, int gameId, string ipAddress, bool isMobile)
        {
            return new Uri("https://www.jenningsbet.com");
        }

        public ReadOnlyCollection<FiftyFiftyGameDto> Get5050SportsGames(string cultureCode)
        {
            const string category = "5050Sports";
            var lst = new List<FiftyFiftyGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new FiftyFiftyGameDto
                {
                    CategoryEn = category,
                    ImageUrl = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    GameName = gameName,
                    GameNameEn = gameName,
                    SubGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<FiftyFiftyGameDto>(lst);
        }

        public ReadOnlyCollection<FiftyFiftyGameDto> Get5050SportsMobileGames(string cultureCode)
        {
            const string category = "5050Sports";
            var lst = new List<FiftyFiftyGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new FiftyFiftyGameDto
                {
                    CategoryEn = category,
                    ImageUrl = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    GameName = gameName,
                    GameNameEn = gameName,
                    SubGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<FiftyFiftyGameDto>(lst);
        }

        public Uri Get5050SportsMiniGameUrl(string cultureCode, Guid userId, string ipAddress)
        {
            return new Uri("http://www.google.com.tw");
        }

        public AmayaGameUrlDto GetAmayaGameUrl(string cultureCode, string ipAddress, string category, string name)
        {
            return new AmayaGameUrlDto
            {
                Free = new Uri("https://www.12bet.uk")
            };
        }

        public AmayaGameUrlDto GetAmayaGameUrl(string cultureCode, Guid userId, string ipAddress, string category, string name)
        {
            return new AmayaGameUrlDto
            {
                Free = new Uri("https://www.12bet.uk"),
                Real = new Uri("https://www.jenningsbet.com")
            };
        }

        public AmayaGameUrlDto GetAmayaGameUrl(string cultureCode, string subGameId, string launghGameId, string gameType,
            string vendorGameType)
        {
            return new AmayaGameUrlDto
            {
                Free = new Uri("https://www.12bet.uk")
            };
        }

        public AmayaGameUrlDto GetAmayaGameUrl(string cultureCode, Guid userId, string subGameId, string launghGameId, string gameType,
            string vendorGameType)
        {
            return new AmayaGameUrlDto
            {
                Free = new Uri("https://www.12bet.uk"),
                Real = new Uri("https://www.jenningsbet.com")
            };
        }

        public ReadOnlyCollection<AmayaGameDto> GetAmayaGames(string cultureCode)
        {
            var categories = new[] { "CardGames", "SoftGames", "TableGames", "Slots_9", "Slots_30" };
            var lst = new List<AmayaGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var category = categories[rnd.Next(1, 100) % categories.Length];
                lst.Add(new AmayaGameDto
                {
                    Category = category,
                    DisplayOrder = rnd.Next(1, 100),
                    ImageUrl = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    LocalizedName = "Amaya " + category + " Name " + i.ToString("00"),
                    SubGameId = category + i,
                    SubGameType = category
                });
            }

            return new ReadOnlyCollection<AmayaGameDto>(lst);
        }

        public ReadOnlyCollection<GameHistoryDto> GetGameHistory(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId, DateTime from, DateTime to)
        {
            var lst = new List<GameHistoryDto>();
            for (var i = 0; i <= 11; i++)
            {
                var rnd = new Random();
                lst.Add(new GameHistoryDto
                {
                    BetAmount = new Decimal(new Random().Next(10, 560)),
                    BetCount = rnd.Next(1, 10),
                    BetDate = DateTime.Now.ToString(CultureInfo.InvariantCulture),
                    Name = "dummy Name",
                    WinLoss = new Decimal(rnd.Next(10, 560))
                });
            }

            return new ReadOnlyCollection<GameHistoryDto>(lst);
        }

        public MultiSlotGameUrlDto GetMultiSlotFreeGameUrl(string cultureCode, int gameId, string ipAddress)
        {
            var rnd = new Random();
            return new MultiSlotGameUrlDto
            {
                GameId = rnd.Next(1, 100),
                Guid = "",
                Language = cultureCode,
                Token = "",
                Url = new Uri("https://www.12bet.uk")
            };
        }

        public ReadOnlyCollection<MultiSlotGameDto> GetMultiSlotGames(string cultureCode)
        {
            var categories = new[] { "CardGames", "SoftGames", "TableGames", "Slots_9", "Slots_30" };
            var lst = new List<MultiSlotGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var category = categories[rnd.Next(1, 100) % categories.Length];
                lst.Add(new MultiSlotGameDto
                {
                    EnCategory = category,
                    DisplayOrder = rnd.Next(1, 100),
                    ImgSrc = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    EnName = "MultiSlot " + category + " Name " + i.ToString("00"),
                    SubGameId = rnd.Next(1, 100).ToString(),
                    Fid = category + i
                });
            }

            return new ReadOnlyCollection<MultiSlotGameDto>(lst);
        }

        public ReadOnlyCollection<MultiSlotGameDto> GetMultiSlotMobileGames(string cultureCode)
        {
            var categories = new[] { "CardGames", "SoftGames", "TableGames", "Slots_9", "Slots_30" };
            var lst = new List<MultiSlotGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var category = categories[rnd.Next(1, 100) % categories.Length];
                lst.Add(new MultiSlotGameDto
                {
                    EnCategory = category,
                    DisplayOrder = rnd.Next(1, 100),
                    ImgSrc = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    EnName = "MultiSlot " + category + " Name " + i.ToString("00"),
                    SubGameId = rnd.Next(1, 100).ToString(),
                    Fid = category + i
                });
            }

            return new ReadOnlyCollection<MultiSlotGameDto>(lst);
        }

        public MultiSlotGameUrlDto GetMultiSlotRealGameUrl(string cultureCode, Guid userId, int gameId, string ipAddress)
        {
            var rnd = new Random();
            return new MultiSlotGameUrlDto
            {
                GameId = rnd.Next(1, 100),
                Guid = Guid.NewGuid().ToString(),
                Language = cultureCode,
                Token = Guid.NewGuid().ToString().ToUpper().Remove('-'),
                Url = new Uri("https://www.12bet.uk")
            };
        }

        public Uri Get5050ProGameUrl(string cultureCode, string gameId, string ipAddress, bool isMobile)
        {
          throw new NotImplementedException();
        }

        public Uri Get5050ScratchCardGameUrl(string cultureCode, string gameId, string ipAddress, bool isMobile)
        {
          throw new NotImplementedException();
        }

        public Uri Get5050SportsGameUrl(string cultureCode, string gameId, string ipAddress, bool isMobile)
        {
          throw new NotImplementedException();
        }

        public ReadOnlyCollection<QuickFireGameDto> GetQuickFireGames(string cultureCode)
        {
            string[] categories = { "table", "table-gold", "videopoker" };
            var lst = new List<QuickFireGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var category = categories[i%categories.Length];
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new QuickFireGameDto
                {
                    LocalizedGameType = category,
                    ImageSrc = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    LocalizedGameName = gameName,
                    ServerGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<QuickFireGameDto>(lst);
        }

        public ReadOnlyCollection<QuickFireGameDto> GetQuickFireMobileGames(string cultureCode)
        {
            string[] categories = { "table", "table-gold", "videopoker" };
            var lst = new List<QuickFireGameDto>();
            var rnd = new Random();
            for (var i = 0; i <= 50; i++)
            {
                var category = categories[i % categories.Length];
                var gameName = category + " Name " + i.ToString("00");
                lst.Add(new QuickFireGameDto
                {
                    LocalizedGameType = category,
                    ImageSrc = "content/images/casino/games/" + category.ToLower() + "/hold_em_showdown.jpg?1.0",
                    LocalizedGameName = gameName,
                    ServerGameId = category + rnd.Next(1, 100)
                });
            }

            return new ReadOnlyCollection<QuickFireGameDto>(lst);
        }

        public Uri GetQuickFireFreeGameUrl(string cultureCode, string gameId, string lobbyUrl)
        {
            throw new NotImplementedException();
        }

        public Uri GetQuickFireMobileFreeGameUrl(string cultureCode, string gameId, string lobbyUrl)
        {
            throw new NotImplementedException();
        }

        public Uri GetQuickFireMobileRealGameUrl(string cultureCode, Guid userId, string gameId, string lobbyUrl)
        {
            throw new NotImplementedException();
        }

        public Uri GetQuickFireRealGameUrl(string cultureCode, Guid userId, string gameId, string lobbyUrl)
        {
            throw new NotImplementedException();
        }


        public ReadOnlyCollection<GameDto> GetGameList(string cultureCode)
        {
            throw new NotImplementedException();
        }
    }
}