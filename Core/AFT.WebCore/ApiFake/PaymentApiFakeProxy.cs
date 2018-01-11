using System;
using System.Collections.Generic;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class PaymentApiFakeProxy : IPaymentApiProxy
    {
        public RegoApi.Proxy.Dtos.PaymentDto.Ukash.Voucher ActivateUkashVoucher(string cultureCode, RegoApi.Proxy.Dtos.PaymentDto.Ukash.Activation activation)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.ConfirmationResult ConfirmDepositByRaven(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Raven.Confirmation confirmation)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.WorldPay.ConfirmationResult ConfirmDepositByWorldPay(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Confirmation confirmation)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.ResetCreditCard ResetRavenCreditCard(string cultureCode, Guid userId)
        {
            return new PaymentDto.Raven.ResetCreditCard
            {
                Message = "Your credit card information has been successfully reset."
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.WorldPay.ResetCreditCard ResetWorldpayCreditCard(string cultureCode, Guid userId)
        {
            return new PaymentDto.WorldPay.ResetCreditCard
            {
                Message = "Your credit card information has been successfully reset."
            };
        }

        public PaymentDto.IsBonusErasedOnWithdrawalDto IsBonusErasedOnWithdrawal(string cultureCode, Guid userId)
        {
            return new PaymentDto.IsBonusErasedOnWithdrawalDto
            {
                DoNotifyWithPopup = true,
                Message = "Need popup"
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Neteller.DepositResult DepositByNeteller(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Neteller.Deposit deposit)
        {
            return new RegoApi.Proxy.Dtos.PaymentDto.Neteller.DepositResult
            {
                BonusResult =
                    new RegoApi.Proxy.Dtos.PaymentDto.Neteller.DepositResult.FundInResult
                    {
                        TransactionCode = "123456",
                        TransferResults = 2
                    },
                CurrentBalance = new Decimal(6123.12),
                DepositAmount = 10,
                TransactionId = Guid.NewGuid().ToString()
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.DepositResult DepositByRaven(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Raven.Deposit deposit)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.DepositResult DepositByRavenFastPay(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Raven.FastPayDeposit deposit)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Ukash.DepositResult DepositByUkash(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Ukash.Deposit deposit)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.WorldPay.DepositResult DepositByWorldPay(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Deposit deposit)
        {
            throw new NotImplementedException();
        }

        public List<RegoApi.Proxy.PaymentMethod> GetDepositMethods(string cultureCode, Guid userId)
        {
            return new List<RegoApi.Proxy.PaymentMethod>
            {
                RegoApi.Proxy.PaymentMethod.Neteller,
                RegoApi.Proxy.PaymentMethod.Ukash,
                RegoApi.Proxy.PaymentMethod.Raven,
                RegoApi.Proxy.PaymentMethod.UkFasterPayment,
                RegoApi.Proxy.PaymentMethod.WorldPay
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Neteller.AccountDetail GetNetellerAccountDetail(string cultureCode, Guid userId)
        {
            return new RegoApi.Proxy.Dtos.PaymentDto.Neteller.AccountDetail
            {
                AccountId = "99999999"
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.AccountDetail GetRavenAccountDetail(string cultureCode, Guid userId)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Raven.FastPayCard GetRavenFastPayCard(string cultureCode, Guid userId)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Skrill.AccountDetail GetSkrillAccountDetail(string cultureCode, Guid userId)
        {
            return new RegoApi.Proxy.Dtos.PaymentDto.Skrill.AccountDetail
            {
                Email = "my@email.com"
            };
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Skrill.DepositStatusResult GetSkrillDepositStatus(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Skrill.DepositStatus status)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Skrill.DepositResult GetSkrillDepositUrl(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Skrill.Deposit deposit)
        {
            throw new NotImplementedException();
        }

        public List<RegoApi.Proxy.Dtos.PaymentDto.History> GetTransactions(string cultureCode, Guid userId, RegoApi.Proxy.TransactionType transactionType, DateTime fromDate, DateTime toDate)
        {
            var lst = new List<RegoApi.Proxy.Dtos.PaymentDto.History>();

            for (var i = 0; i <= 11; i++)
            {
                var rnd = new Random();
                lst.Add(
                    new RegoApi.Proxy.Dtos.PaymentDto.History
                    {
                        ActualAmount = new Decimal(10.50),
                        Amount = new Decimal(rnd.Next(10, 500)),
                        Date = DateTime.Now,
                        Fee = new Decimal(rnd.Next(10, 500)),
                        RebateAmount = new Decimal(rnd.Next(10, 500)),
                        Status = rnd.Next(1, 2),
                        StatusDesc = "dummy status",
                        TotalAmount = new Decimal(rnd.Next(10, 500)),
                        TrackingNo = "BA" + rnd.Next(1000, 9999),
                        TransactionId = Guid.NewGuid(),
                        Type = rnd.Next(0, 1).ToString()
                    });
            }

            return lst;
        }

        public RegoApi.Proxy.PaymentMethod? GetWithdrawalMethod(string cultureCode, Guid userId)
        {
            return RegoApi.Proxy.PaymentMethod.Neteller;
        }

        public RegoApi.Proxy.Dtos.PaymentDto.WorldPay.AccountDetail GetWorldPayAccountDetail(string cultureCode, Guid userId)
        {
            return new RegoApi.Proxy.Dtos.PaymentDto.WorldPay.AccountDetail
            {
                AccountName = "Tester2015",
                Cards = new List<RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Card>
                 {
                     new RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Card
                     {
                          CardNumber = "11234561231", EncryptedCardNumber = "XXXXXXXXXXXXXX", Selected = true
                     },
                     new RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Card
                     {
                          CardNumber = "336699", EncryptedCardNumber = "bbbbbbbbbbbbbbb", Selected = false
                     }
                 }
            };
        }

        public void SendSkrillDepositNotification(string cultureCode, System.Collections.Specialized.NameValueCollection collection, Uri depositUrl, Uri casinoUrl)
        {
            throw new NotImplementedException();
        }

        public void WithdrawByNeteller(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Neteller.Withdrawal withdrawal)
        {
            throw new NotImplementedException();
        }

        public void WithdrawByRaven(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Raven.Withdrawal withdrawal)
        {
            throw new NotImplementedException();
        }

        public void WithdrawBySkrill(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Skrill.Withdrawal withdrawal)
        {
            throw new NotImplementedException();
        }

        public RegoApi.Proxy.Dtos.PaymentDto.Ukash.WithdrawalResult WithdrawByUkash(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.Ukash.Withdrawal withdrawal)
        {
            throw new NotImplementedException();
        }

        public void WithdrawByWorldPay(string cultureCode, Guid userId, RegoApi.Proxy.Dtos.PaymentDto.WorldPay.Withdrawal withdrawal)
        {
            throw new NotImplementedException();
        }


        public PaymentDto.Skrill.DepositStatusResult GetSkrillDepositStatusLoop(string cultureCode, Guid userId, PaymentDto.Skrill.DepositStatus status)
        {
            throw new NotImplementedException();
        }
    }
}
