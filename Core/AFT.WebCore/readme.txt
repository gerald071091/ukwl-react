1.5.91 (2015-12-16)
- Added IsEditable & CoolDownEndtime Attributes on PlayerCenter/GetPaymentLimit 

1.5.89 (2015-12-15)
- Added PlayerCenter/GetPaymentLimit For compliance
- Added PlayerCenter/SetPaymentLimit(string Id, decimal depositDayLimit, decimal depositWeekLimit, decimal depositMonthLimit)
- Updated register api to take 3 additional fields of deposit limits (day/week/month).

1.5.88 (2015-12-12)
- Added IApiProxyCacheManager interface and ApiProxyMemoryCacheManager to handle data cache (Register this in IoC)
- Added CheckIpBlock to use ApiProxyMemoryCacheManager to cache user's ip status
- Added new GameListAPI (unified games with flatten gamed data)
- Added CancelBonus Status check if user's bonus will be void before before user withdrawal

1.5.0.0 (2015-02-04)
- Add Raven and Ukash
- Rename IPaymentApiProxy.NetellerDeposit to IPaymentApiProxy.DepositByNeteller
- Rename IPaymentApiProxy.NetellerWithdrawal to IPaymentApiProxy.WithdrawByNeteller and change the parameter type
- Rename IPaymentApiProxy.WorldPayDeposit to IPaymentApiProxy.DepositByWorldPay and change the parameter type
- Rename IPaymentApiProxy.WorldpayWithdrawal to IPaymentApiProxy.WithdrawByWorldPay and change the parameter type
- Rename IPaymentApiProxy.SkrillWithdrawal to IPaymentApiProxy.WithdrawBySkrill and change the parameter type
- Add WorldPay 3DS
- Add Ourea message parameter in exceptions
- Add Refer Friend API

1.4.0.0 (2014-12-12)
- Change return type of IUtilityApiProxy.IPBlocked from bool to IPBlockedDto

1.3.0.0 (2014-12-08)
- Add DisplayOrder property when getting games from ICasinoApiProxy.GetAmayaGames and ICasinoApiProxy.GetMultiSlotGames
- Remove unused comments 

1.2.0.0 (2014-11-23)
- Change RestClient to IRestClient in the constructor of ApiProxyBase
- Remove restClient.AddHandler("application/json", new JsonDotNetDeserializer()); in the constructor of ApiProxyBase
  Custom handler should be injected from outside of the library
- Remove Newtonsoft.Json
- Remove unused files

1.1.0.0 (2014-11-21)
- Add fromDevice in IAccountApiProxy.LogIn
  fromDevice is used to track where the user comes from, say, Desktop or Mobile
- Remove rememberMe in IAccountApiProxy.LogIn
- Add SessionNotFoundException which will be thrown if Ourea session is not returned
- Remove IPaymentApiProxy.GetFundInList and IPaymentApiProxy.GetFundOutList
- Change parameter type for transaction type from string to enum (TransactionType)