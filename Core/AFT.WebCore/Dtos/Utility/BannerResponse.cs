using System;
using System.Collections.Generic;
using System.Linq;

namespace AFT.WebCore.Dtos.Utility
{
    public class BannerResponse : ApiResponse
    {
        public BannerModel[] Banners { get; set; }
    }
}
