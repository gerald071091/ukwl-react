using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class UtilityApiFakeProxy : IUtilityApiProxy
    {
        public bool CanUserUseProduct(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds game)
        {
            return true;
        }

        public ReadOnlyCollection<CountryDto> GetCountries(string cultureCode)
        {
            var list = new List<CountryDto>();

            const string text = @"[{'code':'AF','name':'Afghanistan'},{'code':'AL','name':'Albania'},{'code':'DZ','name':'Algeria'},{'code':'AD','name':'Andorra'},{'code':'AO','name':'Angola'},{'code':'AI','name':'Anguilla'},{'code':'AQ','name':'Antarctica'},{'code':'AG','name':'Antigua and Barbuda'},{'code':'AR','name':'Argentina'},{'code':'AM','name':'Armenia'},{'code':'AW','name':'Aruba'},{'code':'AT','name':'Austria'},{'code':'AZ','name':'Azerbaijan'},{'code':'BS','name':'Bahamas'},{'code':'BH','name':'Bahrain'},{'code':'JE','name':'Bailiwick of Jersey'},{'code':'BD','name':'Bangladesh'},{'code':'BB','name':'Barbados'},{'code':'BY','name':'Belarus'},{'code':'BZ','name':'Belize'},{'code':'BJ','name':'Benin'},{'code':'BM','name':'Bermuda'},{'code':'BT','name':'Bhutan'},{'code':'BO','name':'Bolivia'},{'code':'BA','name':'Bosnia And Herzegovina'},{'code':'BW','name':'Botswana'},{'code':'BV','name':'Bouvet Island'},{'code':'BR','name':'Brazil'},{'code':'IO','name':'British Indian Ocean Territory'},{'code':'BN','name':'Brunei'},{'code':'BF','name':'Burkina Faso'},{'code':'BI','name':'Burundi'},{'code':'KH','name':'Cambodia'},{'code':'CM','name':'Cameroon'},{'code':'CA','name':'Canada'},{'code':'CV','name':'Cape Verde'},{'code':'CF','name':'Central African Republic'},{'code':'TD','name':'Chad'},{'code':'CL','name':'Chile'},{'code':'CN','name':'China'},{'code':'CX','name':'Christmas Island'},{'code':'CC','name':'Cocos (Keeling) Islands'},{'code':'CO','name':'Colombia'},{'code':'KM','name':'Comoros'},{'code':'CK','name':'Cook Islands'},{'code':'CR','name':'Costa Rica'},{'code':'CI','name':'Cote d\'Ivoire'},{'code':'HR','name':'Croatia'},{'code':'CU','name':'Cuba'},{'code':'CZ','name':'Czech Republic'},{'code':'DJ','name':'Djibouti'},{'code':'DM','name':'Dominica'},{'code':'DO','name':'Dominican Republic'},{'code':'EC','name':'Ecuador'},{'code':'EG','name':'Egypt'},{'code':'SV','name':'El Salvador'},{'code':'GQ','name':'Equatorial Guinea'},{'code':'ER','name':'Eritrea'},{'code':'EE','name':'Estonia'},{'code':'ET','name':'Ethiopia'},{'code':'EU','name':'European Union'},{'code':'FK','name':'Falkland Islands (Malvinas)'},{'code':'FO','name':'Faroe Islands'},{'code':'FJ','name':'Fiji'},{'code':'FI','name':'Finland'},{'code':'GF','name':'French Guiana'},{'code':'PF','name':'French Polynesia'},{'code':'GA','name':'Gabon'},{'code':'GM','name':'Gambia'},{'code':'GE','name':'Georgia'},{'code':'DE','name':'Germany'},{'code':'GH','name':'Ghana'},{'code':'GI','name':'Gibraltar'},{'code':'GR','name':'Greece'},{'code':'GL','name':'Greenland'},{'code':'GD','name':'Grenada'},{'code':'GP','name':'Guadeloupe'},{'code':'GT','name':'Guatemala'},{'code':'GG','name':'Guernsey'},{'code':'GN','name':'Guinea'},{'code':'GW','name':'Guinea-Bissau'},{'code':'HT','name':'Haiti'},{'code':'HN','name':'Honduras'},{'code':'HU','name':'Hungary'},{'code':'IS','name':'Iceland'},{'code':'IN','name':'India'},{'code':'ID','name':'Indonesia'},{'code':'IE','name':'Ireland'},{'code':'IM','name':'Isle of Man'},{'code':'JM','name':'Jamaica'},{'code':'JP','name':'Japan'},{'code':'JO','name':'Jordan'},{'code':'KZ','name':'Kazakhstan'},{'code':'KE','name':'Kenya'},{'code':'KI','name':'Kiribati'},{'code':'KR','name':'Korea, Republic of'},{'code':'KW','name':'Kuwait'},{'code':'KG','name':'Kyrgyzstan'},{'code':'LV','name':'Latvia'},{'code':'LB','name':'Lebanon'},{'code':'LS','name':'Lesotho'},{'code':'LR','name':'Liberia'},{'code':'LY','name':'Libya'},{'code':'LI','name':'Liechtenstein'},{'code':'LT','name':'Lithuania'},{'code':'LU','name':'Luxembourg'},{'code':'MO','name':'Macao'},{'code':'MK','name':'Macedonia'},{'code':'MG','name':'Madagascar'},{'code':'MW','name':'Malawi'},{'code':'MY','name':'Malaysia'},{'code':'MV','name':'Maldives'},{'code':'ML','name':'Mali'},{'code':'MT','name':'Malta'},{'code':'MH','name':'Marshall Islands'},{'code':'MQ','name':'Martinique'},{'code':'MR','name':'Mauritania'},{'code':'MU','name':'Mauritius'},{'code':'YT','name':'Mayotte'},{'code':'MX','name':'Mexico'},{'code':'MD','name':'Moldova'},{'code':'MC','name':'Monaco'},{'code':'MN','name':'Mongolia'},{'code':'MS','name':'Montserrat'},{'code':'MA','name':'Morocco'},{'code':'MZ','name':'Mozambique'},{'code':'MM','name':'Myanmar'},{'code':'NA','name':'Namibia'},{'code':'NR','name':'Nauru'},{'code':'NP','name':'Nepal'},{'code':'NC','name':'New Caledonia'},{'code':'NZ','name':'New Zealand'},{'code':'NI','name':'Nicaragua'},{'code':'NE','name':'Niger'},{'code':'NG','name':'Nigeria'},{'code':'NU','name':'Niue'},{'code':'NF','name':'Norfolk Island'},{'code':'NO','name':'Norway'},{'code':'OM','name':'Oman'},{'code':'PK','name':'Pakistan'},{'code':'PW','name':'Palau'},{'code':'PA','name':'Panama'},{'code':'PG','name':'Papua New Guinea'},{'code':'PY','name':'Paraguay'},{'code':'PE','name':'Peru'},{'code':'PN','name':'Pitcairn'},{'code':'PT','name':'Portugal'},{'code':'PR','name':'Puerto Rico'},{'code':'QA','name':'Qatar'},{'code':'RO','name':'Romania'},{'code':'RW','name':'Rwanda'},{'code':'RE','name':'Réunion'},{'code':'SH','name':'Saint Helena'},{'code':'KN','name':'Saint Kitts and Nevis'},{'code':'LC','name':'Saint Lucia'},{'code':'PM','name':'Saint Pierre and Miquelon'},{'code':'VC','name':'Saint Vincent and the Grenadines'},{'code':'WS','name':'Samoa'},{'code':'ST','name':'Sao Tome and Principe'},{'code':'SN','name':'Senegal'},{'code':'RS','name':'Serbia '},{'code':'SC','name':'Seychelles'},{'code':'SL','name':'Sierra Leone'},{'code':'SK','name':'Slovakia'},{'code':'SI','name':'Slovenia'},{'code':'SB','name':'Solomon Islands'},{'code':'SO','name':'Somalia'},{'code':'ZA','name':'South Africa'},{'code':'GS','name':'South Georgia and the South Sandwich Islands'},{'code':'LK','name':'Sri Lanka'},{'code':'SD','name':'Sudan'},{'code':'SR','name':'Suriname'},{'code':'SJ','name':'Svalbard and Jan Mayen Islands'},{'code':'SZ','name':'Swaziland'},{'code':'SE','name':'Sweden'},{'code':'SY','name':'Syria'},{'code':'TJ','name':'Tajikistan'},{'code':'TZ','name':'Tanzania'},{'code':'TH','name':'Thailand'},{'code':'TL','name':'Timor-Leste'},{'code':'TG','name':'Togo'},{'code':'TK','name':'Tokelau'},{'code':'TO','name':'Tonga'},{'code':'TT','name':'Trinidad and Tobago'},{'code':'TN','name':'Tunisia'},{'code':'TM','name':'Turkmenistan'},{'code':'TC','name':'Turks and Caicos Islands'},{'code':'TV','name':'Tuvalu'},{'code':'UG','name':'Uganda'},{'code':'AE','name':'United Arab Emirates'},{'code':'GB','name':'United Kingdom'},{'code':'UY','name':'Uruguay'},{'code':'UZ','name':'Uzbekistan'},{'code':'VU','name':'Vanuatu'},{'code':'VA','name':'Vatican'},{'code':'VE','name':'Venezuela'},{'code':'WF','name':'Wallis and Futuna'},{'code':'EH','name':'Western Sahara'},{'code':'YE','name':'Yemen'},{'code':'YU','name':'Yugoslavia'},{'code':'ZM','name':'Zambia'},{'code':'ZW','name':'Zimbabwe'}]";
            dynamic data = JsonConvert.DeserializeObject(text);
            for (var i = 0; i < data.Count; i++)
            {
                dynamic item = data[i];
                var country = new CountryDto
                {
                    Code = (string)item.code,
                    Name = (string)item.name
                };
                list.Add(country);
            }
            return new ReadOnlyCollection<CountryDto>(list);
        }

        public ReadOnlyCollection<CurrencyDto> GetCurrencies(string cultureCode)
        {
            var list = new List<CurrencyDto>();
            const string text = @"[{'code':'EUR','name':'EUR'},{'code':'GBP','name':'GBP'},{'code':'USD','name':'USD'}]";
            dynamic data = JsonConvert.DeserializeObject(text);

            for (var i = 0; i < data.Count; i++)
            {
                dynamic item = data[i];
                var country = new CurrencyDto
                {
                    Code = (string)item.code,
                    Name = (string)item.name
                };
                list.Add(country);
            }
            return new ReadOnlyCollection<CurrencyDto>(list);
        }

        public void HitBanner(string cultureCode, string introducer, string bannerId, string description)
        {
        }

        public IPBlockedDto IPBlocked(string cultureCode, string ipAddress, string host, RegoApi.Proxy.IPBlockType ipBlockType)
        {
            return new IPBlockedDto
            {
                Blocked = false
            };
        }

        public void ReferFriend(string cultureCode, RegoApi.Proxy.Dtos.ReferFriendDto friend)
        {
        }

        public void SendQuery(string cultureCode, RegoApi.Proxy.Dtos.SendQueryDto query)
        {
        }
    }
}