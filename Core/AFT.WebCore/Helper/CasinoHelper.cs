//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Net;
//using System.Web.Mvc;
//using System.Web.UI;
//using AFT.RegoApi.Proxy;
//using AFT.RegoApi.Proxy.Dtos;
//using AFT.RegoApi.Proxy.Implementations;
//using AFT.RegoApi.Proxy.Interfaces;
//using AFT.WebCore.Api;
//using AFT.WebCore.Dtos.Casino;
//using AFT.WebCore.Utils;
//using WebApi.OutputCache.V2;

//namespace AFT.WebCore.Helper
//{
//    public class QueryGameListRequest
//    {
//        public string Keyword { get; set; }

//        public bool Paging { get; set; }

//        private int _page = 1;
//        public int Page
//        {
//            get { return _page; }
//            set { _page = value; }
//        }

//        private int _pageSize = 50;
//        public int PageSize
//        {
//            get { return _pageSize; }
//            set { _pageSize = value; }
//        }

//        public SortType SortType { get; set; }

//        private string _languageFilter = null;
//        /// <summary>
//        /// if you are filtering data using language code, make sure passing "neutral" for neutral language
//        /// passing empty string will result no language filter at all
//        /// </summary>
//        public string LanguageFilter { get { return _languageFilter; } set { _languageFilter = (value != null && value.ToLowerInvariant() == "neutral") ? "" : value; } }

//        public Guid CategoryId { get; set; }

//        public string VendorId { get; set; }

//        public Platform Platform { get; set; }
//    }


//    public partial class CmsHelper
//    {
//        /// <summary>
//        /// Return a list of games as a serialized json array by specific query request and 
//        /// </summary>
//        /// <param name="req">query conditions</param>
//        /// <returns></returns>
//        [OutputCache(Duration = 1800, Location = OutputCacheLocation.ServerAndClient)]
//        public IEnumerable<GameModel> GetGameList(QueryGameListRequest req)
//        {
//            //var contextBase = DependencyResolver.Current.GetService<GameListManager>();
//            //int outCount = 1;

//            //var modalRequest = new GetGameListRequest
//            //{
//            //    Keyword = req.Keyword,
//            //    Sorting = new Sort<GameListSortBy>(GameListSortBy.OrderNumber, req.SortType),
//            //    CategoryId = req.CategoryId,
//            //    GameListPageSize = req.PageSize,
//            //    Paging = (req.Paging) ? new Paging(req.Page, req.PageSize) : null,
//            //    Platform = req.Platform,
//            //    VendorId = req.VendorId
//            //};

//            //var games = contextBase.GetGames(out outCount, modalRequest, CultureCode);

//            //foreach (var g in games)
//            //{
//            //    var productId = (ProductIds)int.Parse(g.VendorId);
//            //    g.VendorName = ProductMapping.ReverseMappings[productId];
//            //}


//            //var casinoApiProxy = DependencyResolver.Current.GetService<ICasinoApiProxy>();
//            //var utilityApiProxy = DependencyResolver.Current.GetService<IUtilityApiProxy>();
//            //var userContext = DependencyResolver.Current.GetService<UserContext>();
//            //var networkUtility = DependencyResolver.Current.GetService<NetworkUtility>();

//            var casinoController = DependencyResolver.Current.GetService<CasinoController>(); //new CasinoController(casinoApiProxy, utilityApiProxy, userContext, networkUtility);
//            var gameRequest = casinoController.GetGameList();

//            return gameRequest.Games;
//        }

//        [OutputCache(Duration = 1800, Location = OutputCacheLocation.ServerAndClient)]
//        public IEnumerable<GameCategoryDto> GetGameCategories(bool isMobile)
//        {
//            //var contextBase = DependencyResolver.Current.GetService<GameListManager>();

//            //var categories = contextBase.GetCategories(CultureCode, isMobile ? Platform.Mobile : Platform.Desktop);

//            var gameRequest = GetGameList(new QueryGameListRequest());

//            var categories = new List<GameCategoryDto>();

//            foreach(var g in gameRequest)
//            {
//                categories.Add(new GameCategoryDto
//                {
//                    Id = g.CategoryId,
//                    Name = g.CategoryName,
//                    SortOrder = g.CategoryOrderNumber
//                });
//            }

//            var x = categories.Distinct(new DistinctItemComparer()).OrderBy(c => c.SortOrder);

//            return x;
//        }


//        public class GameCategoryDto
//        {
//            public string Id { get; set; }
//            public string Name { get; set; }
//            public decimal SortOrder { get; set; }
//        }


//        public class DistinctItemComparer : IEqualityComparer<GameCategoryDto>
//        {

//            public bool Equals(GameCategoryDto x, GameCategoryDto y)
//            {
//                return x.Name == y.Name &&
//                    x.Id == y.Id;
//            }

//            public int GetHashCode(GameCategoryDto obj)
//            {
//                return obj.Name.GetHashCode() ^
//                    obj.Id.GetHashCode();
//            }
//        }
//    }
//}
