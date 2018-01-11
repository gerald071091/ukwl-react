using System;
using System.Collections.Generic;

namespace AFT.WebCore.Dtos.News
{
    public class NewsDto
    {
        public class GetSingleNewsResponse : ApiResponse
        {
            public News News { get; set; }
        }

        public class GetLatestNewsResponses : ApiResponse
        {
            public List<News> Newses { get; set; }
        }

        public class News
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Content { get; set; }

            public string Summary { get; set; }

            public DateTimeOffset? PublishDate { get; set; }

            public string LanguageCode { get; set; }
        }
    }
}