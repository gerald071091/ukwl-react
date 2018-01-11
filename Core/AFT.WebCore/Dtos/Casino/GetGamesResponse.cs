using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using AFT.RegoApi.Proxy;
using AFT.WebCore.Dtos.Casino;

namespace AFT.WebCore.Dtos.Casino
{
    public class GetGameListResponse : ApiResponse
    {
        public IEnumerable<GameModel> Games { get; set; }
    }

    public class GameModel
    {
        public string Id { get; set; }
        public string SubGameId { get; set; }
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal CategoryOrderNumber { get; set; }
        public ProductIds VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorGameType { get; set; }
        public GameEnums Platform { get; set; }
        public string LaunchGameId { get; set; }
        public string LaunchGameType { get; set; }
        public decimal OrderNumber { get; set; }
        public string ImageSrc { get; set; }
        public bool Status { get; set; }
    }

    public class GetGameCategoriesResponse : ApiResponse
    {
        public IEnumerable<GameCategories> Categories { get; set; }
    }

    public class GameCategories
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public decimal SortOrder { get; set; }
    }

    public class SearchGamesRequest
    {
        public string Keyword { get; set; }

        /// <summary>
        /// The direction to order the games
        /// </summary>
        public SortType SortType { get; set; }

        private int _page = 0;
        public int Page
        {
            get { return _page; }
            set { _page = value; }
        }

        private int _pageSize = 20;
        public int Pagesize
        {
            get { return _pageSize; }
            set { _pageSize = value; }
        }

        public Guid Category { get; set; }
        public string Vendor { get; set; }
        public GameEnums Platform { get; set; }
    }
}