using System;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class AccountApiFakeProxy : IAccountApiProxy
    {
        public AccountApiFakeProxy()
        {

        }


        public void ChangePassword(string cultureCode, Guid userId, string username, string current, string @new)
        {
            //throw new NotImplementedException();
        }

        public MyDetailsDto GetMyDetails(string cultureCode, Guid userId)
        {
            return new MyDetailsDto
            {
                AddressLine1 = "AddressLine1",
                AddressLine2 = "AddressLine2",
                AddressLine3 = "AddressLine3",
                City = "City",
                Country = "Country",
                Email = "test@user.com",
                FirstName = "Dummy User",
                LastName = "Lastname",
                MobileNumber = "01234567",
                PostalCode = "3123"
            };
        }

        public LogInDto LogIn(string cultureCode, string username, string password, string ipAddress, string rememberMe, RegoApi.Proxy.FromDevice fromDevice)
        {
            return new LogInDto
            {
                Currency = "GBP",
                UserId = Guid.NewGuid(),
                Username = "Testuser2015"
            };
        }

        public LogInDto LogInByToken(string cultureCode, string token, string ipAddress, RegoApi.Proxy.FromDevice fromDevice)
        {
            throw new NotImplementedException();
        }

        public void ResetPassword(string cultureCode, string username, string email, RegoApi.Proxy.GetPasswordBy getPasswordBy)
        {
            throw new NotImplementedException();
        }

        public GetPaymentLimitDto GetPaymentLimit(string cultureCode, Guid userId)
        {
            throw new NotImplementedException();
        }

        public void SetPaymentLimit(string cultureCode, Guid userId, decimal depositDayLimit, decimal depositWeekLimit,
            decimal depositMonthLimit)
        {
            throw new NotImplementedException();
        }

        public void ConfirmPendingPaymentLimit(string cultureCode, Guid userId)
        {
            throw new NotImplementedException();
        }

        public void ResetPassword(string cultureCode, string username, string email, RegoApi.Proxy.SecurityQuestion securityQuestion, string securityAnswer, RegoApi.Proxy.GetPasswordBy getPasswordBy)
        {
            throw new NotImplementedException();
        }

        public void SelfExclude(string cultureCode, Guid userId, int days, string isCompulsiveGambler, string reason, string linkedAccounts)
        {
            throw new NotImplementedException();
        }

        public void SignUp(string cultureCode, SignUpDetails signUpDetails)
        {
            throw new NotImplementedException();
        }

        SetPaymentLimitDto IAccountApiProxy.SetPaymentLimit(string cultureCode, Guid userId, decimal depositDayLimit, decimal depositWeekLimit, decimal depositMonthLimit)
        {
            throw new NotImplementedException();
        }

        ConfirmPendingPaymentLimitDto IAccountApiProxy.ConfirmPendingPaymentLimit(string cultureCode, Guid userId)
        {
            throw new NotImplementedException();
        }


        public RealityCheckTimeDto GetRealityCheckTime(string cultureCode, string userId)
        {
            throw new NotImplementedException();
        }

        public void SetRealityCheckTime(string cultureCode, string userId, int RealityAlertCheckTime = 0)
        {
            throw new NotImplementedException();
        }
    }
}
