using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Threading.Tasks;
using System.Web.Mvc;

using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos.Casino;
using AFT.WebCore.Dtos.Casino.Amaya;
using AFT.WebCore.Dtos.Casino.FiftyFifty;
using AFT.WebCore.Dtos.Casino.MultiSlot;
using AFT.WebCore.Dtos.Casino.QuickFire;

using Common.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AFT.WebCore.Helper
{
    public partial class CmsHelper
    {
        private IList<Task> _tasks;

        public string GetCasinoGames(bool isMobile = false)
        {
            _tasks = new List<Task>();

            var mobileCache = "";
            if (isMobile)
                mobileCache = "Mobile";

            var json = GetCasinoGamesFromCache(isMobile, mobileCache);
            if (!_tasks.Any())
                return json;

            for (int i = 0; i < 3; i++)
            {
                try
                {
                    Task.WaitAll(_tasks.ToArray());

                    _tasks = new List<Task>();
                    json = GetCasinoGamesFromCache(isMobile, mobileCache);

                    if (!_tasks.Any())
                        break;
                }
                catch (AggregateException ex)
                {
                    var log = LogManager.GetLogger("WhitelabelApi");
                    foreach (Exception innerEx in ex.InnerExceptions)
                    {
                        log.Error(
                            string.Format("Failed to execute {0} -> {1}.",
                                "MvcApplication",
                                "LoadCache"), innerEx);
                    }
                }
            }

            return json;
        }

        public string GetCasinoGamesFromCache(bool isMobile, string mobileCache)
        {
            var casinoApiProxy = DependencyResolver.Current.GetService<ICasinoApiProxy>();
            var response = new GetCasinoGamesResponse();
            ObjectCache cache = MemoryCache.Default;

            //Amaya
            var amayaDtos = cache["amaya" + mobileCache] as IEnumerable<AmayaGameDto>;
            if (amayaDtos != null && amayaDtos.Any())
            {
                response.Amaya = amayaDtos.Select(AmayaDtoToModel).ToArray();
            }

            if ((response.Amaya == null || !amayaDtos.Any()) && !isMobile)
            {
                SetTaskList("amaya" + mobileCache, casinoApiProxy.GetAmayaGames);
            }

            //Multi Slot
            var multiSlotDtos = cache["multiSlot" + mobileCache] as IEnumerable<MultiSlotGameDto>;
            if (multiSlotDtos != null && multiSlotDtos.Any())
            {
                response.MultiSlot = multiSlotDtos.Select(MultiSlotDtoToModel).ToArray();
            }

            if (response.MultiSlot == null || !response.MultiSlot.Any())
            {
                if (!isMobile)
                    SetTaskList("multiSlot" + mobileCache, casinoApiProxy.GetMultiSlotGames);
                else
                    SetTaskList("multiSlot" + mobileCache, casinoApiProxy.GetMultiSlotMobileGames);
            }

            //Quick Fire
            var quickFireDtos = cache["quickFire" + mobileCache] as IEnumerable<QuickFireGameDto>;
            if (quickFireDtos != null && quickFireDtos.Any())
            {
                response.QuickFire = quickFireDtos.Select(QuickFireDtoToModel).ToArray();
            }

            if (response.QuickFire == null || !response.QuickFire.Any())
            {
                if (!isMobile)
                    SetTaskList("quickFire" + mobileCache, casinoApiProxy.GetQuickFireGames);
                else
                    SetTaskList("quickFire" + mobileCache, casinoApiProxy.GetQuickFireMobileGames);
            }

            //Real Sports
            var rsg = cache["rsgPro" + mobileCache] as IEnumerable<FiftyFiftyGameDto>;
            if (rsg != null && rsg.Any())
            {
                response.RsgPro = rsg.Select(FiftyFiftyDtoToModel).ToArray();
            }

            if (response.RsgPro == null || !response.RsgPro.Any())
            {
                if (!isMobile)
                    SetTaskList("rsgPro" + mobileCache, casinoApiProxy.Get5050ProGames);
                else
                    SetTaskList("rsgPro" + mobileCache, casinoApiProxy.Get5050ProGames, g => g.IsSupportMobile);
            }

            rsg = cache["rsgScratch" + mobileCache] as IEnumerable<FiftyFiftyGameDto>;
            if (rsg != null && rsg.Any())
            {
                response.RsgScratch = rsg.Select(FiftyFiftyDtoToModel).ToArray();
            }

            if (response.RsgScratch == null || !response.RsgScratch.Any())
            {
                if (!isMobile)
                    SetTaskList("rsgScratch" + mobileCache, casinoApiProxy.Get5050ScratchCardGames);
                else
                    SetTaskList("rsgScratch" + mobileCache, casinoApiProxy.Get5050ScratchCardGames, g => g.IsSupportMobile);
            }

            rsg = cache["rsgSports" + mobileCache] as IEnumerable<FiftyFiftyGameDto>;
            if (rsg != null && rsg.Any())
            {
                response.RsgSports = rsg.Select(FiftyFiftyDtoToModel).ToArray();
            }

            if (response.RsgSports == null || !response.RsgSports.Any())
            {
                if (!isMobile)
                    SetTaskList("rsgSports" + mobileCache, casinoApiProxy.Get5050SportsGames);
                else
                    SetTaskList("rsgSports" + mobileCache, casinoApiProxy.Get5050SportsMobileGames, g => g.IsSupportMobile);
            }

            return JsonConvert.SerializeObject(response, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }).Replace("\"", "\\\"");
        }

        #region private method(s)

        private void SetTaskList<T>(string name, Func<string, IReadOnlyCollection<T>> func, Func<T, bool> whereClause = null)
        {
            ObjectCache cache = MemoryCache.Default;
            if (whereClause == null) whereClause = c => true;
            _tasks.Add(
                    Task.Factory.StartNew(() => { cache[name] = func(_cultureCode).Where(whereClause); },
                        TaskCreationOptions.None));
        }

        private AmayaGameModel AmayaDtoToModel(AmayaGameDto game)
        {
            return new AmayaGameModel
            {
                Category = game.Category,
                Name = game.LocalizedName,
                ImageUrl = game.ImageUrl,
                DisplayOrder = game.DisplayOrder
            };
        }

        private MultiSlotGameModel MultiSlotDtoToModel(MultiSlotGameDto game)
        {
            return new MultiSlotGameModel
            {
                Id = game.SubGameId,
                Category = _cultureCode == "zh-cn" ? game.CnCategory : game.EnCategory,
                Name = _cultureCode == "zh-cn" ? game.CnName : game.EnName,
                ImageUrl = game.ImgSrc,
                DisplayOrder = game.DisplayOrder
            };
        }

        private QuickFireGameModel QuickFireDtoToModel(QuickFireGameDto game)
        {
            return new QuickFireGameModel
            {
                Id = game.ServerGameId,
                Category = game.LocalizedGameType,
                Name = game.LocalizedGameName,
                ImageUrl = game.ImageSrc
            };
        }

        private FiftyFiftyGameModel FiftyFiftyDtoToModel(FiftyFiftyGameDto game)
        {
            return new FiftyFiftyGameModel
            {
                Category = CultureCode == "zh-cn" ? game.CategoryCn : game.CategoryEn,
                Name = CultureCode == "zh-cn" ? game.GameNameCn : game.GameNameEn,
                GameId = game.SubGameId,
                ImageUrl = game.ImageUrl
            };
        }

        #endregion private method(s)
    }
}