using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AFT.WebCore.Dtos;

namespace AFT.WebCore.Dtos.Nationality
{
    public class NationalityResponse : ApiResponse
    {
        public NationalityModel[] Nationality { get; set; }
    }
}
