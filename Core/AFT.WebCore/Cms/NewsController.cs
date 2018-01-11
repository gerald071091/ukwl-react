using System;
using System.Linq;
using System.Diagnostics.Contracts;
using System.Web.Http;
using AFT.RegoApi.Proxy.Interfaces;
using AFT.RegoCMS.WhiteLabel.Api;
using AFT.RegoCMS.WhiteLabel.Dtos.News;
using AFT.RegoCMS.WhiteLabel.Services;
using AFT.RegoCMS.WhiteLabel.Utils;
using AFT.RegoCMS.WhiteLabel.Dtos;

namespace AFT.RegoCMS.WhiteLabel.Cms
{
    [RoutePrefix("api/{culture}")]
    public class NewsController : ApiBase
    {
        private readonly UserContext _userContext;
        private readonly NetworkUtility _networkUtility;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly ICmsService _cmsService;

        public NewsController(ICmsService cmsService, IUtilityApiProxy utilityApiProxy,
            UserContext userContext, NetworkUtility networkUtility)
        {
            Contract.Requires(cmsService != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);
            Contract.Requires(networkUtility != null);

            _cmsService = cmsService;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
            _networkUtility = networkUtility;
        }

        [HttpGet, Route("newses/{id}")]
        [AllowAnonymous]
        public virtual NewsDto.GetSingleNewsResponse GetNews(Guid id)
        {
            var item = _cmsService.GetNewsItem(this.CultureCode, id);

            return new NewsDto.GetSingleNewsResponse
            {
                Code = ResponseCode.Success,
                News = new NewsDto.News
                {
                    Title = item.Content.Title,
                    Content = item.Content.Content,
                    LanguageCode = item.Content.LanguageCode,
                    PublishDate = item.Content.PublishDate,
                    Summary = item.Content.Summary
                }
            };
        }

        [HttpGet, Route("newses")]
        [AllowAnonymous]
        public virtual NewsDto.GetLatestNewsResponses GetLatestNews(int count = 50)
        {
            var items = _cmsService.GetLatestNews(this.CultureCode, 50);

            var newses = items.Select(x => new NewsDto.News
            {
                Id = x.ContentId,
                Title = x.Content.Title,
                Content = x.Content.Content,
                LanguageCode = x.Content.LanguageCode,
                PublishDate = x.Content.PublishDate,
                Summary = x.Content.Summary
            }).ToList();

            return new NewsDto.GetLatestNewsResponses
            {
                Code = ResponseCode.Success,
                Newses = newses
            };
        }
    }
}