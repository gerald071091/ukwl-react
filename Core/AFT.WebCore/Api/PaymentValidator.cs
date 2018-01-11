using System;
using System.Linq;

using AFT.RegoApi.Proxy;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    public class PaymentValidator
    {
        #region private field(s)

        private readonly IPaymentApiProxy _paymentApiProxy;
        private readonly string _cultureCode;
        private readonly Guid _userId;
        private readonly PaymentMethod _paymentMethod;

        #endregion private field(s)

        public PaymentValidator(IPaymentApiProxy paymentApiProxy, string cultureCode, Guid userId, PaymentMethod paymentMethod)
        {
            _paymentApiProxy = paymentApiProxy;
            _cultureCode = cultureCode;
            _userId = userId;
            _paymentMethod = paymentMethod;
        }

        public ResponseCode? ValidateDeposit(Dtos.Payment.PaymentDto.DepositBaseRequest request)
        {
            var methods = _paymentApiProxy.GetDepositMethods(_cultureCode, _userId);

            if (!methods.Contains(_paymentMethod))
            {
                return ResponseCode.PaymentMethodNotAllowed;
            }

            if (string.IsNullOrWhiteSpace(request.Product) || ProductMapping.Mappings.Keys.All(key => key != request.Product))
            {
                return ResponseCode.ProductNotFound;
            }

            return null;
        }

        public ResponseCode? ValidateWithdraw(Dtos.Payment.PaymentDto.WithdrawalBaseRequest request)
        {
            var method = _paymentApiProxy.GetWithdrawalMethod(_cultureCode, _userId);

            if (!method.HasValue)
            {
                return ResponseCode.DepositNotFound;
            }

            if (method.Value != _paymentMethod)
            {
                return ResponseCode.PaymentMethodNotAllowed;
            }

            return null;
        }
    }
}