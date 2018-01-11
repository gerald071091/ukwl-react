using System;
using System.Web.Mvc;

using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Utils;

using Common.Logging;

namespace AFT.WebCore.Controllers
{
    public class PaymentController : Controller
    {
        private static readonly ILog Log = LogManager.GetLogger<PaymentController>();
        private readonly IPaymentApiProxy _paymentApiProxy;
        private readonly CultureUtility _cultureUtility;
        private readonly NetworkUtility _networkUtility;
        private readonly UserContext _userContext;
        private readonly Configurations _configurations;

        public PaymentController(IPaymentApiProxy paymentApiProxy, CultureUtility cultureUtility,
            NetworkUtility networkUtility, UserContext userContext, Configurations configurations)
        {
            _paymentApiProxy = paymentApiProxy;
            _cultureUtility = cultureUtility;
            _networkUtility = networkUtility;
            _userContext = userContext;
            _configurations = configurations;
        }

        /// <summary>
        /// Will be called by WorldPay
        /// </summary>
        /// <param name="paRes">Payment Authentication Response</param>
        /// <param name="md">Transation Id</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult WorldPay3DSecureCallback(string paRes, string md)
        {
            var mobile = RouteData.Values["mobile"];

            var depositUrl = GetDepositUrl(mobile);

            var casinoUrl = GetCasinoUrl(mobile);
            try
            {
                Log.InfoFormat("Getting PaRes [{0}] and MD [{1}] from [{2}]", paRes, md,
                    _networkUtility.GetClientIPAddress());


                var result = _paymentApiProxy.ConfirmDepositByWorldPay(_cultureUtility.GetCultureCode(),
                    _userContext.UserId,
                    new PaymentDto.WorldPay.Confirmation
                    {
                        PaymentAuthenticationResponse = paRes,
                        TransactionId = md,
                        CasinoUrl = casinoUrl,
                        DepositUrl = depositUrl
                    });

                return
                    View(GetViewPath(mobile), result);
            }
            catch (DepositNotCompletedException ex)
            {
                Log.Error("Failed to process WorldPay 3DS callback", ex);
                return
                    View(GetViewPath(mobile), null);
            }
            catch (Exception ex)
            {
                Log.Error("Failed to process WorldPay 3DS callback", ex);
                //return new FilePathResult(
                //    string.Format(_configurations.ErrorPagePath, (int)HttpStatusCode.InternalServerError,
                //        _cultureUtility.GetCultureCode()), MediaTypeNames.Text.Html);

                return
                    View(GetViewPath(mobile), null);
            }
        }

        #region private method(s)

        private string GetViewPath(object mobile)
        {
            var controller = RouteData.Values["controller"];
            var action = RouteData.Values["action"];

            return mobile == null
                ? string.Format("~/Views/{0}/{1}/{2}.cshtml", _cultureUtility.GetCultureCode(), controller, action)
                : string.Format("~/Views/{0}/{1}/{2}/{3}.cshtml", _cultureUtility.GetCultureCode(), mobile, controller,
                    action);
        }

        private string GetCasinoUrl(object mobile)
        {
            return mobile == null
                ? string.Format("{0}/{1}/{2}", _configurations.DefaultDomain, _cultureUtility.GetCultureCode(),
                    _configurations.CasinoPath)
                : string.Format("{0}/{1}/{2}/{3}", _configurations.DefaultDomain, _cultureUtility.GetCultureCode(),
                    mobile,
                    _configurations.CasinoPath);
        }

        private string GetDepositUrl(object mobile)
        {
            return mobile == null
                ? string.Format("{0}/{1}/{2}", _configurations.DefaultDomain, _cultureUtility.GetCultureCode(),
                    _configurations.DepositPath)
                : string.Format("{0}/{1}/{2}/{3}", _configurations.DefaultDomain, _cultureUtility.GetCultureCode(),
                    mobile,
                    _configurations.DepositPath);
        }

        #endregion private method(s)
    }
}