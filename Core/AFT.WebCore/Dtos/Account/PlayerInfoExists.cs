using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.WebCore.Dtos.Account
{
    public class PlayerInfoExistsRequest
    {
        public string LoginName { get; set; }
        public string EmailAddress { get; set; }
        public string MobileNumber { get; set; }
    }

    public class PlayerInfoExistsResponse : ApiResponse
    {
        public bool isExists { get; set; }
    }
}
