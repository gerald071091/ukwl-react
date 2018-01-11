using System.Configuration;
using System.Web;
using System.Web.Mvc;
using AFT.RegoApi.Proxy.Interfaces;
using AFT.RegoCMS.WhiteLabel.Services;
using Microsoft.Practices.Unity;
﻿using Microsoft.Practices.Unity.InterceptionExtension;
using Unity.WebApi;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class FakeMvcApplication : AFT.RegoCMS.WhiteLabel.MvcApplication
    {
        protected override void RegisterRoutes()
        {
            
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            return container;
        }

        protected override void RegisterDependentServices()
        {
            //Log.Debug("Registering dependent services.");

            string apiBaseUrl = ConfigurationManager.AppSettings["ApiBaseUrl"];

            if (string.IsNullOrWhiteSpace(apiBaseUrl))
            {
                throw new ConfigurationErrorsException("ApiBaseUrl not found.");
            }

            var container = Container.Instance;
            container.AddNewExtension<Interception>();

            container.RegisterType<IAccountApiProxy, AccountApiFakeProxy>();
            container.RegisterType<IAnnouncementApiProxy, AnnouncementApiFakeProxy>();
            container.RegisterType<IBalanceApiProxy, BalanceApiFakeProxy>();
            container.RegisterType<IBonusApiProxy, BonusApiFakeProxy>();
            container.RegisterType<ICasinoApiProxy, CasinoApiFakeProxy>();
            container.RegisterType<IFinancialBettingApiProxy, FinancialBettingApiFakeProxy>();
            container.RegisterType<ILiveCasinoApiProxy, LiveCasinoApiFakeProxy>();
            container.RegisterType<IPaymentApiProxy, PaymentApiFakeProxy>();
            container.RegisterType<IPromotionApiProxy, PromotionApiFakeProxy>();
            container.RegisterType<ISportsbookApiProxy, SportsbookApiFakeProxy>();
            container.RegisterType<ITransferFundApiProxy, TransferFundApiFakeProxy>();
            container.RegisterType<ITermsAndConditionsApiProxy, TermsAndConditionsApiFakeProxy>();
            container.RegisterType<IUtilityApiProxy, UtilityApiFakeProxy>();


            container.RegisterType<HttpContextBase>(new InjectionFactory(x => new HttpContextWrapper(HttpContext.Current)));
            container.RegisterType<ICmsService, CmsService>();
            container.RegisterType<ICmsSessionService, CmsSessionService>();

            //DependencyResolver.SetResolver(new UnityDependencyResolver(new UnityContainer()));

            //Log.Debug("Registered dependent services.");
        }
    }
}
