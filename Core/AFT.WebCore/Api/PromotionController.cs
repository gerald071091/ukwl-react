using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Promotion;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class PromotionController : ApiBase
    {
        #region private field(s)

        private readonly IPromotionApiProxy _promotionApiProxy;

        #endregion private field(s)

        public PromotionController(IPromotionApiProxy promotionApiProxy)
        {
            Contract.Requires(promotionApiProxy != null);
            _promotionApiProxy = promotionApiProxy;
        }

        [Route("promotions")]
        [HttpGet]
        [AllowAnonymous]
        public GetPromotionsResponse GetPromotions()
        {
            var promotions = _promotionApiProxy.GetPromotions(CultureCode);

            return new GetPromotionsResponse
            {
                Code = ResponseCode.Success,
                Promotions = promotions.Select(TransformToModelFrom).ToArray()
            };
        }

        [Route("promotions/{promotionId:int}")]
        [HttpGet]
        [AllowAnonymous]
        public GetPromotionResponse GetPromotionByPromotionId(string promotionId)
        {
            var promotion = _promotionApiProxy.GetPromotionByPromotionId(CultureCode, promotionId);

            if (promotion == null)
            {
                return new GetPromotionResponse { Code = ResponseCode.PromotionNotFound };
            }

            return new GetPromotionResponse
            {
                Code = ResponseCode.Success,
                Promotion = TransformToModelFrom(promotion)
            };
        }

        [Route(@"promotions/{bonusCode}")]
        [HttpGet]
        public GetPromotionResponse GetPromotionByBonusCode(string bonusCode)
        {
            var promotion = _promotionApiProxy.GetPromotionByBonusCode(CultureCode, bonusCode);

            if (promotion == null)
            {
                return new GetPromotionResponse { Code = ResponseCode.PromotionNotFound };
            }

            return new GetPromotionResponse
            {
                Code = ResponseCode.Success,
                Promotion = TransformToModelFrom(promotion)
            };
        }

        #region private model

        private PromotionModel TransformToModelFrom(PromotionDto promotion)
        {
            return new PromotionModel
            {
                Id = promotion.PromotionId,
                Name = promotion.PromotionName,
                BonusCode = promotion.BonusCode,
                Order = promotion.Order,
                UpdatedDate = promotion.UpdatedDate,
                DisplayName = promotion.DisplayName,
                ImageUrl = promotion.ImageUrl,
                BigImageUrl = promotion.BigImageUrl,
                Summary = promotion.Summary,
                Terms = promotion.Terms
            };
        }

        #endregion private model
    }
}