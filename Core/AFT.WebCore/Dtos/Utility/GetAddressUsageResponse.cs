using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.WebCore.Dtos.Utility
{
    public class GetAddressUsageResponse : ApiResponse
    {
        public AddressUsageModel AddressUsage { get; set; }
    }
}
