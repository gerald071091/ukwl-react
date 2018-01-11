using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.WebCore.Dtos.Utility
{
    public class GetAddressResponse : ApiResponse
    {
        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public List<string> Addresses { get; set; } 

        public IReadOnlyCollection<AddressModel> AddressList { get; set; }
    }
}
