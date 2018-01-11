using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.WebCore.Dtos.Utility
{
    public class GetServerTimeResponse : ApiResponse
    {
        public string Now { get; set; }
    }
}
