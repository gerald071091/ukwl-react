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
using AFT.WebCore.Dtos.TransferFund;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class TransferFundController : ApiBase
    {
        #region private field(s)

        private readonly ITransferFundApiProxy _transferFundApiProxy;
        private readonly UserContext _userContext;

        #endregion private field(s)

        public TransferFundController(ITransferFundApiProxy transferFundApiProxy, UserContext userContext)
        {
            Contract.Requires(transferFundApiProxy != null);
            Contract.Requires(userContext != null);

            _transferFundApiProxy = transferFundApiProxy;
            _userContext = userContext;
        }

        [Route("transfer/" + ProductMapping.MAIN + "/{amount}/" + ProductMapping.MICROGAMING)]
        [HttpPost]
        public TransferFromMainWalletToResponse TransferFromMainWalletToMicroGamingWallet([FromUri]decimal amount)
        {
            try
            {
                _transferFundApiProxy.TransferFromMainWalletTo(CultureCode, _userContext.UserId,
                    ProductIds.MicroGamingPokerGame, amount);

                return new TransferFromMainWalletToResponse { Code = ResponseCode.Success };
            }
            catch (TransferNotCompletedException ex)
            {
                return new TransferFromMainWalletToResponse { Code = ResponseCode.TransferNotCompleted, ErrorMessage = ex.Message };
            }
        }

        [Route("transfer/" + ProductMapping.MICROGAMING + "/{amount}/" + ProductMapping.MAIN)]
        [HttpPost]
        public TransferToMainWalletFromResponse TransferToMainWalletFromMicroGamingWallet([FromUri]decimal amount)
        {
            try
            {
                _transferFundApiProxy.TransferToMainWalletFrom(CultureCode, _userContext.UserId,
                    ProductIds.MicroGamingPokerGame, amount);

                return new TransferToMainWalletFromResponse { Code = ResponseCode.Success };
            }
            catch (TransferNotCompletedException ex)
            {
                return new TransferToMainWalletFromResponse { Code = ResponseCode.TransferNotCompleted, ErrorMessage = ex.Message };
            }
        }

        [Route("transfers/" + ProductMapping.MAIN)]
        [HttpGet]
        public GetMainWalletHistoryResponse GetMainWalletHistory(DateTime from, DateTime to, int page = 1, int pageSize = 10)
        {
            ReadOnlyCollection<TransferHistoryDto> histories =
                _transferFundApiProxy.GetMainWalletTransferHistory(CultureCode, _userContext.UserId, from, to);

            return new GetMainWalletHistoryResponse
            {
                Code = ResponseCode.Success,
                Histories = histories.Skip((page - 1) * pageSize).Take(pageSize).Select(history => new TransferHistoryModel
                {
                    Code = history.Code,
                    ProductId = history.ProductId,
                    Amount = history.Amount,
                    Date = history.Date
                }).ToArray()
            };
        }

        [Route("transfers/" + ProductMapping.MICROGAMING)]
        [HttpGet]
        public GetMicrogamingWalletHistoryResponse GetMicrogamingWalletHistory(DateTime @from, DateTime to, int page = 1, int pageSize = 10)
        {
            ReadOnlyCollection<TransferHistoryDto> histories =
                _transferFundApiProxy.GetOtherWalletTransferHistory(CultureCode, _userContext.UserId, from, to);

            return new GetMicrogamingWalletHistoryResponse
            {
                Code = ResponseCode.Success,
                Histories =
                    histories.Where(x => x.ProductId == ProductIds.MicroGamingPokerGame)
                    .Skip((page - 1) * pageSize).Take(pageSize)
                        .Select(history => new TransferHistoryModel
                        {
                            Code = history.Code,
                            ProductId = history.ProductId,
                            Amount = history.Amount,
                            Date = history.Date
                        }).ToArray()
            };
        }
    }
}