using System;
using AFT.RegoApi.Proxy;

namespace AFT.WebCore.Dtos.Account
{
    public class SignUpRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public SecurityQuestion SecurityQuestion { get; set; }

        public string SecurityAnswer { get; set; }

        public Title Title { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string PostalCode { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string MobileNumber { get; set; }

        public string Currency { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        public string Introducer { get; set; }

        public string BTag { get; set; }

        public int Nationality { get; set; }

        public string Subscription { get; set; }

        public decimal DepositDayLimit { get; set; }

        public decimal DepositWeekLimit { get; set; }

        public decimal DepositMonthLimit { get; set; }

        public string Platform { get; set; }

        public string isHousePlayer { get; set; }

        // IOVATION
        public string IovationBlackBox { get; set; }

        public string FirstPartyBlackBox { get; set; }
    }
}