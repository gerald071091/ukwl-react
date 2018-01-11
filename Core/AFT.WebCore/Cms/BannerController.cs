using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;
using AFT.RegoCMS.WhiteLabel.Api;
using AFT.RegoCMS.WhiteLabel.Dtos;
using AFT.RegoCMS.WhiteLabel.Dtos.Banner;
using AFT.RegoCMS.WhiteLabel.Services;
using AFT.RegoCMS.WhiteLabel.Utils;
using WebApi.OutputCache.V2;

namespace AFT.RegoCMS.WhiteLabel.Cms
{
    [RoutePrefix("api/{culture}")]
    public class BannerController : ApiBase
    {
        private readonly NetworkUtility _networkUtility;
        private readonly ICmsService _cmsService;

        public BannerController(ICmsService cmsService, NetworkUtility networkUtility)
        {
            Contract.Requires(cmsService != null);
            Contract.Requires(networkUtility != null);

            _cmsService = cmsService;
            _networkUtility = networkUtility;
        }

        [CacheOutput(ClientTimeSpan = 300, ServerTimeSpan = 300)]
        [HttpGet, Route("banners/{tag}")]
        [AllowAnonymous]
        public virtual GetBannersResponse GetBanners(string tag)
        {
            var isViewingDraft = _networkUtility.IsViewingDraft();
            var banners = _cmsService.GetBanners(CultureCode, tag, isViewingDraft);

            var bannerTypes = new Dictionary<string, string>
            {
                {"1", "image"},
                {"2", "flash"},
                {"3", "video"}
            };

            return new GetBannersResponse
            {
                Code = ResponseCode.Success,
                Banners = banners
                    .Select(ci => new BannerModel
                    {
                        Path = ci.BannerPath,
                        Type = bannerTypes[ci.BannerType],
                        Link = ci.Link,
                        ThumbnailPath = ci.SmallBannerPath,
                        Target = ci.Target,
                        Title = ci.Title
                    }).ToArray()
            };
        }
    }
}