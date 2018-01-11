using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.WebCore.Dtos.Utility
{
    public class AddressUsageModel
    {
        public int DailyRequestCount { get; set; }

        public int DailyRequestLimit1 { get; set; }

        public int DailyRequestLimit2 { get; set; }
    }
}
