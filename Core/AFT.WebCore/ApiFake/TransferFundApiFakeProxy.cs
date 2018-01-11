using System;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class TransferFundApiFakeProxy : ITransferFundApiProxy
    {
        public System.Collections.ObjectModel.ReadOnlyCollection<RegoApi.Proxy.Dtos.TransferHistoryDto> GetMainWalletTransferHistory(string cultureCode, Guid userId, DateTime from, DateTime to)
        {
            throw new NotImplementedException();
        }

        public System.Collections.ObjectModel.ReadOnlyCollection<RegoApi.Proxy.Dtos.TransferHistoryDto> GetOtherWalletTransferHistory(string cultureCode, Guid userId, DateTime from, DateTime to)
        {
            throw new NotImplementedException();
        }

        public void TransferFromMainWalletTo(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId, decimal amount)
        {
            throw new NotImplementedException();
        }

        public void TransferToMainWalletFrom(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId, decimal amount)
        {
            throw new NotImplementedException();
        }
    }
}
