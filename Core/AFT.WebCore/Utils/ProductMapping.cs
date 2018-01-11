using System.Collections.Generic;
using System.Linq;
using AFT.RegoApi.Proxy;

namespace AFT.WebCore.Utils
{
    public static class ProductMapping
    {
        public const string MAIN = "main";
        public const string SBTECH = "sbtech";
        public const string SPOTOPTION = "spotoption";
        public const string MULTISLOT = "multislot";
        public const string AMAYA = "amaya";
        public const string MICROGAMING = "microgaming";
        public const string REALSPORTS = "realsports";
        public const string GOLDDELUXE = "gd";
        public const string UGS = "ugs";


        private static readonly Dictionary<string, ProductIds> Mapping;

        static ProductMapping()
        {
            if (Mapping == null)
            {
                Mapping = new Dictionary<string, ProductIds>
                {
                    {MAIN, ProductIds.MainBalance},
                    {SBTECH, ProductIds.SBTech},
                    {SPOTOPTION, ProductIds.FinancialBetting},
                    {MULTISLOT, ProductIds.Multislot},
                    {AMAYA, ProductIds.MacauAndLiveCasino},
                    {MICROGAMING, ProductIds.MicroGamingPokerGame},
                    {REALSPORTS, ProductIds.RealsportsAnd5050},
                    {GOLDDELUXE, ProductIds.GD},
                    {UGS, ProductIds.UGS}
                };
            }
        }

        public static Dictionary<string, ProductIds> Mappings
        {
            get
            {
                return Mapping;
            }
        }

        public static Dictionary<ProductIds, string> ReverseMappings
        {
            get
            {
                return Mapping.ToDictionary(product => product.Value, product => product.Key);
            }
        }
    }
}