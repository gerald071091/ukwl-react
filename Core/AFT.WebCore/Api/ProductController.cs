using System;
using System.Collections.ObjectModel;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Web.Http;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Casino;
using AFT.WebCore.Dtos.Product;
using AFT.WebCore.Filters;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}/products")]
    public class ProductController : ApiBase
    {
        #region private field(s)

        private readonly IBalanceApiProxy _balanceApiProxy;
        private readonly IBonusApiProxy _bonusApiProxy;
        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly UserContext _userContext;

        #endregion private field(s)

        public ProductController(IBalanceApiProxy balanceApiProxy, IBonusApiProxy bonusApiProxy,
            IUtilityApiProxy utilityApiProxy, UserContext userContext)
        {
            Contract.Requires(balanceApiProxy != null);
            Contract.Requires(bonusApiProxy != null);
            Contract.Requires(utilityApiProxy != null);
            Contract.Requires(userContext != null);

            _balanceApiProxy = balanceApiProxy;
            _bonusApiProxy = bonusApiProxy;
            _utilityApiProxy = utilityApiProxy;
            _userContext = userContext;
        }

        [Route("{product}/wallet")]
        [HttpGet]
        [ValidateProduct]
        public virtual GetWalletBalanceResponse GetWalletBalance(string product)
        {
            WalletBalanceDto wallet = _balanceApiProxy.GetWalletBalance(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product]);

            return new GetWalletBalanceResponse
            {
                Code = ResponseCode.Success,
                Balance = wallet.Balance,
                HasBonus = wallet.HasBonus
            };
        }

        [Route("{product}/available-balances")]
        [HttpGet]
        [ValidateProduct]
        public GetAvailableBalanceResponse GetAvailableBalance(string product)
        {
            var balance = _balanceApiProxy.GetAvailableBalance(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product]);

            return new GetAvailableBalanceResponse
            {
                Code = ResponseCode.Success,
                Balance = balance.Balance,
                HasBonus = balance.HasBonus
            };
        }

        [Route("{product}/bonus-balances")]
        [HttpGet]
        [ValidateProduct]
        public GetBonusBalanceResponse GetBonusBalance(string product)
        {
            var balance = _balanceApiProxy.GetBonusBalance(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product]);

            return new GetBonusBalanceResponse { Code = ResponseCode.Success, Balance = balance };
        }

        [Route("{product}/betting-balances")]
        [HttpGet]
        [ValidateProduct]
        public GetBettingBalanceResponse GetBettingBalance(string product)
        {
            var balance = _balanceApiProxy.GetBettingBalance(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product]);

            return new GetBettingBalanceResponse { Code = ResponseCode.Success, Balance = balance };
        }

        [Route("bonus-betting-balances")]
        [HttpGet]
        public GetBonusAndBettingBalancesResponse GetBonusAndBettingBalances()
        {
            ReadOnlyCollection<BonusAndBettingBalanceDto> bonusAndBettingBalances =
                _balanceApiProxy.GetBonusAndBettingBalances(CultureCode, _userContext.UserId);

            if (!bonusAndBettingBalances.Any())
            {
                return new GetBonusAndBettingBalancesResponse
                {
                    Code = ResponseCode.BonusAndBettingBalancesNotFound
                };
            }

            var response = new GetBonusAndBettingBalancesResponse
            {
                Code = ResponseCode.Success,
                Balances = bonusAndBettingBalances.Select(bonusAndBettingBalance => new BonusAndBettingBalancesModel
                {
                    Product = ProductMapping.ReverseMappings[bonusAndBettingBalance.ProductIds],
                    Bonus = bonusAndBettingBalance.Bonus,
                    Betting = bonusAndBettingBalance.Betting,
                    BonusStatus = FormatBonusStatus(bonusAndBettingBalance.BonusStatus)
                }).ToArray()
            };

            return response;
        }

        [Route("{product}/bonus-histories")]
        [HttpGet]
        [ValidateProduct]
        public GetBonusHistoryResponse GetBonusHistory(string product, BonusStatus status, DateTime from, DateTime to, int page = 1, int pageSize = 10)
        {
            var bonuses = _bonusApiProxy.GetBonusHistory(CultureCode, _userContext.UserId,
                ProductMapping.Mappings[product], status, from, to);

            return new GetBonusHistoryResponse
            {
                Code = ResponseCode.Success,
                TotalNumber = bonuses.Count,
                Histories = bonuses.Skip((page - 1) * pageSize).Take(pageSize).Select(history => new BonusHistoryModel
                {
                    Code = history.BonusCode,
                    Description = history.Description,
                    Product = history.ProductName,
                    Amount = history.BonusAmount,
                    ExpiryDate = history.ExpiryDate,
                    Status = history.Status
                }).ToArray()
            };
        }

        [Route("{product}/claim-bonus/{bonusCode}")]
        [HttpPost]
        [ValidateProduct]
        public ClaimBonusResponse ClaimBonus(string product, string bonusCode)
        {
            try
            {
                _bonusApiProxy.ClaimBonus(CultureCode, _userContext.UserId, ProductMapping.Mappings[product], bonusCode);

                return new ClaimBonusResponse { Code = ResponseCode.Success };
            }
            catch (BonusNotClaimedException ex)
            {
                return new ClaimBonusResponse { Code = ResponseCode.BonusNotClaimed, ErrorMessage = ex.Message };
            }
        }

        [Route("{product}/available")]
        [HttpGet]
        [ValidateProduct]
        public CanUseProductResponse CanUseProduct([FromUri]string product)
        {
            var response = new CanUseProductResponse
            {
                Code =
                    _utilityApiProxy.CanUserUseProduct(CultureCode, _userContext.UserId, ProductMapping.Mappings[product])
                        ? ResponseCode.Success
                        : ResponseCode.ProductNotAvailable
            };

            return response;
        }

        #region private method(s)

        private string FormatBonusStatus(BonusStatus bonusStatus)
        {
            switch (bonusStatus)
            {
                case BonusStatus.Active:
                case BonusStatus.Wagered:
                case BonusStatus.Void:
                    return bonusStatus.ToString();

                default:
                    return "-";
            }
        }

        #endregion private method(s)
    }
}