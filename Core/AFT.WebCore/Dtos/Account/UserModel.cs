namespace AFT.WebCore.Dtos.Account
{
    public class UserModel
    {
        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        public string PostalCode { get; set; }

        public string MobileNumber { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string CurrencySymbol { get; set; }

        public string Status { get; set; }

		public bool LowDeposit { get; set; }
	}
}