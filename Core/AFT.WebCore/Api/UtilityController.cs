using System;
using System.Configuration;
using System.Diagnostics.Contracts;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApi.OutputCache.V2;

using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Exceptions;
using AFT.RegoApi.Proxy.Interfaces;

using AFT.WebCore.Dtos;
using AFT.WebCore.Dtos.Utility;
using AFT.WebCore.Dtos.Nationality;
using AFT.WebCore.Filters;
using Newtonsoft.Json;
using RestSharp;
using AFT.WebCore.Utils;

namespace AFT.WebCore.Api
{
    [RoutePrefix("api/{culture}")]
    public class UtilityController : ApiBase
    {
        #region private field(s)

        private readonly IUtilityApiProxy _utilityApiProxy;
        private readonly IAccountApiProxy _accountApiProxy;
        private readonly UserContext _userContext;

        #endregion private field(s)

        public UtilityController(IUtilityApiProxy utilityApiProxy, IAccountApiProxy accountApiProxy, UserContext userContext)
        {
            Contract.Requires(userContext != null);
            Contract.Requires(accountApiProxy != null);
            Contract.Requires(utilityApiProxy != null);

            _utilityApiProxy = utilityApiProxy;
            _accountApiProxy = accountApiProxy;
            _userContext = userContext;
        }

        [Route("send-query")]
        [AllowAnonymous]
        [ValidateNullRequest]
        [HttpPost]
        public virtual SendQueryResponse SendQuery([FromBody]SendQueryRequest request)
        {
            try
            {
                _utilityApiProxy.SendQuery(CultureCode, new SendQueryDto
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Telephone = request.Telephone,
                    Subject = request.Subject,
                    Content = request.Content
                });
                return new SendQueryResponse { Code = ResponseCode.Success };
            }
            catch (QueryNotSentException ex)
            {
                return new SendQueryResponse { Code = ResponseCode.QueryNotSent, ErrorMessage = ex.Message };
            }
        }

        [Route("refer-friend")]
        [ValidateNullRequest]
        [HttpPost]
        public virtual ReferFriendResponse ReferFriend([FromBody]ReferFriendRequest request)
        {
            try
            {
                var details = _accountApiProxy.GetMyDetails(CultureCode, _userContext.UserId);

                if (details == null)
                {
                    return new ReferFriendResponse { Code = ResponseCode.UserDetailsNotFound };
                }

                _utilityApiProxy.ReferFriend(CultureCode, new ReferFriendDto
                {
                    Username = _userContext.Username,
                    UserEmail = details.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email
                });
                return new ReferFriendResponse { Code = ResponseCode.Success };
            }
            catch (ReferFriendNotSendException ex)
            {
                return new ReferFriendResponse { Code = ResponseCode.FriendNotReferred, ErrorMessage = ex.Message };
            }
        }

        [CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        [Route("countries")]
        [HttpGet]
        [AllowAnonymous]
        public virtual GetCountriesResponse GetCountries()
        {
            return new GetCountriesResponse
            {
                Code = ResponseCode.Success,
                Countries =
                    _utilityApiProxy.GetCountries(CultureCode)
                        .Select(country => new CountriesModel { Code = country.Code, Name = country.Name })
                        .ToArray()
            };
        }

        [CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        [Route("currencies")]
        [HttpGet]
        [AllowAnonymous]
        public virtual GetCurrenciesResponse GetCurrencies()
        {
            return new GetCurrenciesResponse
            {
                Code = ResponseCode.Success,
                Currencies =
                    _utilityApiProxy.GetCurrencies(CultureCode)
                        .Select(currency => new CurrenciesModel { Code = currency.Code, Name = currency.Name })
                        .ToArray()
            };
        }

        [Route("convert-decimal/{dec}/{precision}")]
        [HttpGet]
        [AllowAnonymous]
        public virtual GetDecimalConversionResponse GetDecimalConversion(string dec, int precision)
        {
            decimal converted;
            if (Decimal.TryParse(dec, out converted))
            {
                decimal decimalValue = Math.Round(converted, 2, MidpointRounding.AwayFromZero);

                return new GetDecimalConversionResponse
                {
                    Code = ResponseCode.Success,
                    ConversionResult = decimalValue
                };
            }
            else
            {
                return new GetDecimalConversionResponse
                {
                    Code = ResponseCode.FailedToConvertDecimal
                };
            }
        }

        [CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        [Route("nationality")]
        [HttpGet]
        [AllowAnonymous]
        public virtual NationalityResponse GetNationality()
        {
            var nationality = _utilityApiProxy.GetNationality(CultureCode);
            return new NationalityResponse
            {
                Code = ResponseCode.Success,

                Nationality = nationality.Select(pNationality => new NationalityModel 
                { 
                    Id = pNationality.Fid,
                    Name = pNationality.FName
                }).ToArray()
            };
        }

        [CacheOutput(ClientTimeSpan = 1800, ServerTimeSpan = 1800)]
        [Route("getbanners")]
        [HttpGet]
        [AllowAnonymous]
        public virtual BannerResponse GetBannerResponse(string bannerType, string isLoggedIn = "n", string platform = "desktop")
        {
            return new BannerResponse
            {
                Code = ResponseCode.Success,
                Banners = _utilityApiProxy.GetBannerList(CultureCode, bannerType, isLoggedIn, platform).Select(item => new BannerModel
                {
                    Id = item.Id,
                    BannerName = item.BannerName,
                    Title = item.Title,
                    Link = item.Link,
                    BannerType = item.BannerType,
                    BannerUrl = item.BannerUrl,
                    SmallBannerUrl = item.SmallBannerUrl
                }).ToArray()
            };
        }

        [Route("setsubscription/{email}/{sms}/{post}")]
        [HttpPost]
        [AllowAnonymous]
        public virtual SetSubscriptionResponse SetSubscription(bool email, bool sms, bool post)
        {

            try
            {
                var response = _utilityApiProxy.SetSubscription(CultureCode, _userContext.UserId, email, sms, post);

                return new SetSubscriptionResponse
                {
                    Code = ResponseCode.Success,
                    Message = response.Message
                };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new SetSubscriptionResponse
                {
                    Code = ResponseCode.SetSubscriptionFailed,
                    ErrorMessage = ex.Message
                };
            }

        }

        [Route("getsubscription")]
        [HttpGet]
        [AllowAnonymous]
        public virtual GetSubscriptionReponse GetSubscription()
        {
            try
            {
                var response = _utilityApiProxy.GetSubscription(CultureCode, _userContext.UserId);

                return new GetSubscriptionReponse
                {
                    Code = ResponseCode.Success,
                    Subscription = new GetSubscriptionReponse.SubscribeModel
                    {
                        Email = response.Email,
                        SMS = response.SMS,
                        Post = response.Post
                    }
                };
            }
            catch (ApiProxyBrokenException ex)
            {
                return new GetSubscriptionReponse
                {
                    Code = ResponseCode.GetSubscriptionFailed,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("clearcache")]
        [HttpGet]
        [SuppressCsrfProtection]
        [AllowAnonymous]
        public virtual ApiResponse ClearCache()
        {
            try
            {
                var cache = Configuration.CacheOutputConfiguration().GetCacheOutputProvider(Request);
                //cache.RemoveStartsWith(Configuration.CacheOutputConfiguration().MakeBaseCachekey((CasinoController t) => t.GetGameList()));

                string returnStr = "";
                foreach (var key in cache.AllKeys)
                {
                    returnStr += key + "\n";
                    cache.Remove(key);
                }

                return new ApiResponse
                {
                     Code = ResponseCode.Success,
                     Message = "Successfully cleared cache "
                };
                //return returnStr;
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Code = ResponseCode.BrokenApiProxy,
                    Message = "Cannot clear cache. Please contact administrator",
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("GetAddress/{postalcode}"), HttpGet]
        [AllowAnonymous]
        public virtual GetAddressResponse GetAddress(string postalCode)
        {
            try
            {
                var client = new RestClient("https://api.getAddress.io");

                var request = new RestRequest("/v2/uk/" + postalCode, Method.GET);
                request.AddParameter("api-key", ConfigurationManager.AppSettings["AddressLicenseKey"]);

                var response = client.Execute<GetAddressResponse>(request);

                if (response.Data.Addresses == null)
                {
                    return new GetAddressResponse()
                    {
                        Code = ResponseCode.UnexpectedError,
                        ErrorMessage = response.Data.Message
                    };
                }
                else
                {
                    response.Data.AddressList =
                        response.Data.Addresses.Select(address => address.Split(','))
                            .Select(addressDetails => new AddressModel()
                            {
                                Line1 = addressDetails[0].Trim(),
                                Line2 = addressDetails[1].Trim(),
                                Line3 = addressDetails[2].Trim(),
                                Locality = addressDetails[3].Trim(),
                                Town = addressDetails[4].Trim(),
                                County = addressDetails[5].Trim()
                            }).ToList().AsReadOnly();

                    return new GetAddressResponse()
                    {
                        Code = ResponseCode.Success,
                        Latitude = response.Data.Latitude,
                        Longitude = response.Data.Longitude,
                        AddressList = response.Data.AddressList
                    };
                }
            }
            catch (Exception ex)
            {

                return new GetAddressResponse()
                {
                    Code = ResponseCode.UnexpectedError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("GetAddressUsage/{day?}/{month?}/{year?}"), HttpGet]
        [AllowAnonymous]
        public virtual GetAddressUsageResponse GetAddressUsage(int? day = null, int? month = null, int? year = null)
        {
            try
            {
                var client = new RestClient("https://api.getAddress.io");

                var resource = day == null && month == null && year == null ? "usage" : "usage/{day}/{month}/{year}";

                var request = new RestRequest(resource, Method.GET);
                request.AddParameter("api-key", ConfigurationManager.AppSettings["AddressLicenseKey"]);
                request.AddUrlSegment("day", day.ToString());
                request.AddUrlSegment("month", month.ToString());
                request.AddUrlSegment("year", year.ToString());

                var response = client.Execute<AddressUsageModel>(request);

                if (response.Data == null)
                {
                    return new GetAddressUsageResponse()
                    {
                        Code = ResponseCode.UnexpectedError,
                        ErrorMessage = response.ErrorMessage
                    };
                }

                return new GetAddressUsageResponse()
                {
                    Code = ResponseCode.Success,
                    AddressUsage = response.Data
                };
            }
            catch (Exception ex)
            {
                return new GetAddressUsageResponse()
                {
                    Code = ResponseCode.UnexpectedError,
                    ErrorMessage = ex.Message
                };
            }
        }

        [Route("GetDefaultCountryValues/{countryISO}"), HttpGet]
        [AllowAnonymous]
        public virtual CountryInfoResponse GetCountryDefaultValues(string countryISO)
        {

            //var appDomain = AppDomain.CurrentDomain;
            //var basePath = appDomain.RelativeSearchPath ?? appDomain.BaseDirectory;
            var path = HttpContext.Current.Server.MapPath("~/Views/Data/countryDefault.json");// Path.Combine(basePath, "Data", "countryDefault.json");

            using (StreamReader reader = new StreamReader(path))
            {
                var json = reader.ReadToEnd();
                CountryRawResponse countries = JsonConvert.DeserializeObject<CountryRawResponse>(json);
                foreach (var country in countries.CountryRaw)
                {
                    if (country.CountryISO == countryISO)
                    {
                        return new CountryInfoResponse
                        {
                            Code = ResponseCode.Success,
                            countryInfo = new CountryInfoModel
                            {
                                CountryCode = country.CountryISO,
                                CountryISO = country.CountryCode,
                                Currency = country.Currency
                            }
                        };
                    }
                }
                
                
            }

            return new CountryInfoResponse { 
                Code = ResponseCode.UnexpectedError, 
                countryInfo = new CountryInfoModel()
            }; 
        }

        [Route("GetServerTime"), HttpGet]
        [AllowAnonymous]
        public virtual GetServerTimeResponse GetServerTime()
        {
            var result = _utilityApiProxy.GetServerTime(CultureCode);

            return new GetServerTimeResponse { Now = result, Code = ResponseCode.Success };

        }

        [Route("ProgressiveTickers/{jackpotId?}"), HttpGet]
        [AllowAnonymous]
        public virtual GetProgressiveTickersResponse GetProgressiveTickers(string jackpotId = "")
        {
            try
            {
                Log.InfoFormat("Retrieving list of Progressive Tickers.");

                var client = new RestClient("http://www.tickerassist.co.uk");
                var request = new RestRequest("/ProgressiveTickers/WebServiceProgressiveTickerXMLAll.asmx/tickerXMLFeedAll");

                var response = client.Execute(request);

                var progressiveTickers = XmlParser.DeserializeXmlObject<ProgressiveTickers>(response.Content);

                if (progressiveTickers != null)
                {
                    Log.InfoFormat("Successfully retrieved list of Progressive Tickers.");
                    return jackpotId != ""
                        ? new GetProgressiveTickersResponse { Code = ResponseCode.Success, ProgressiveTickers = progressiveTickers.ProgressiveTicker.Where(p => p.JackpotId == jackpotId).ToList().AsReadOnly() }
                        : new GetProgressiveTickersResponse { Code = ResponseCode.Success, ProgressiveTickers = progressiveTickers.ProgressiveTicker };
                }

                Log.InfoFormat("Failed to retrieve list of Progressive Tickers.");
                return new GetProgressiveTickersResponse { Code = ResponseCode.Failed, ErrorMessage = "Failed to retrieve progressive tickers." };
            }
            catch (Exception ex)
            {
                Log.Error("Unexpected Error: " + ex.Message);
                return new GetProgressiveTickersResponse { Code = ResponseCode.UnexpectedError, ErrorMessage = ex.Message };
            }
        }
    }
}