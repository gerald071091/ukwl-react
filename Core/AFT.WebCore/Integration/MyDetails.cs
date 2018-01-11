using AFT.RegoApi.Proxy.Dtos;

namespace AFT.WebCore.Integration
{
    public class MyDetails
    {
        private readonly MyDetailsDto _myDetails;

        public MyDetails(MyDetailsDto myDetails)
        {
            _myDetails = myDetails;
        }

        public string FirstName
        {
            get { return _myDetails.FirstName; }
        }

        public string LastName
        {
            get { return _myDetails.LastName; }
        }

        public string AddressLine1
        {
            get { return _myDetails.AddressLine1; }
        }

        public string AddressLine2
        {
            get { return _myDetails.AddressLine2; }
        }

        public string AddressLine3
        {
            get { return _myDetails.AddressLine3; }
        }

        public string PostalCode
        {
            get { return _myDetails.PostalCode; }
        }

        public string City
        {
            get { return _myDetails.City; }
        }

        public string Country
        {
            get { return _myDetails.Country; }
        }

        public string MobileNumber
        {
            get { return _myDetails.MobileNumber; }
        }

        public string Email
        {
            get { return _myDetails.Email; }
        }
    }
}