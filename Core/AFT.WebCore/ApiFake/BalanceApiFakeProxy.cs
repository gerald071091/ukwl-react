using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using AFT.RegoApi.Proxy.Dtos;
using AFT.RegoApi.Proxy.Interfaces;

namespace AFT.RegoCMS.WhiteLabel.ApiFake
{
    public class BalanceApiFakeProxy : IBalanceApiProxy
    {
        public AvailableBalanceDto GetAvailableBalance(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId)
        {
            return new RegoApi.Proxy.Dtos.AvailableBalanceDto
            {
                Balance = new Decimal(612334.125),
                HasBonus = true
            };
        }

        public decimal GetBettingBalance(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId)
        {
            return new Decimal(336699.52);
        }

        public ReadOnlyCollection<RegoApi.Proxy.Dtos.BonusAndBettingBalanceDto> GetBonusAndBettingBalances(string cultureCode, Guid userId)
        {
            var list = new List<RegoApi.Proxy.Dtos.BonusAndBettingBalanceDto>
            {
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(10), BonusStatus = RegoApi.Proxy.BonusStatus.Active, 
                     ProductIds = RegoApi.Proxy.ProductIds.SBTech
                },
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(20), BonusStatus = RegoApi.Proxy.BonusStatus.Void, 
                     ProductIds = RegoApi.Proxy.ProductIds.MainBalance
                }
                ,
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(23), BonusStatus = RegoApi.Proxy.BonusStatus.Void, 
                     ProductIds = RegoApi.Proxy.ProductIds.FinancialBetting
                },
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(40), BonusStatus = RegoApi.Proxy.BonusStatus.Void, 
                     ProductIds = RegoApi.Proxy.ProductIds.MacauAndLiveCasino
                },
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(11), BonusStatus = RegoApi.Proxy.BonusStatus.Void, 
                     ProductIds = RegoApi.Proxy.ProductIds.MicroGamingPokerGame
                }
                ,
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(9), BonusStatus = RegoApi.Proxy.BonusStatus.Active, 
                     ProductIds = RegoApi.Proxy.ProductIds.Multislot
                }
                ,
                new BonusAndBettingBalanceDto{
                     Betting = new Decimal(22), Bonus = new Decimal(33), BonusStatus = RegoApi.Proxy.BonusStatus.Void, 
                     ProductIds = RegoApi.Proxy.ProductIds.RealsportsAnd5050
                }
            };
            var coll = new System.Collections.ObjectModel.ReadOnlyCollection<RegoApi.Proxy.Dtos.BonusAndBettingBalanceDto>(list);

            return coll;
        }

        public decimal GetBonusBalance(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId)
        {
            return new Decimal(9963.12);
        }

        public WalletBalanceDto GetWalletBalance(string cultureCode, Guid userId, RegoApi.Proxy.ProductIds productId)
        {
            return new RegoApi.Proxy.Dtos.WalletBalanceDto
            {
                Balance = new Decimal(123456123.123),
                HasBonus = false
            };
        }
    }
}
