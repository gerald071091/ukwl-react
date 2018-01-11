using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace AFT.WebCore.Utils
{
    /// <summary>
    /// Convert 3 Digit currency code to currency symbol, putting result in static
    /// vars for better performance.
    /// </summary>
    public static class CurrencyUtility
    {
        private static readonly IDictionary<string, string> Map;

        static CurrencyUtility()
        {
            Map = CultureInfo
                .GetCultures(CultureTypes.AllCultures)
                .Where(c => !c.IsNeutralCulture)
                .Select(culture =>
                {
                    try
                    {
                        return new RegionInfo(culture.LCID);
                    }
                    catch
                    {
                        return null;
                    }
                })
                .Where(ri => ri != null)
                .GroupBy(ri => ri.ISOCurrencySymbol)
                .ToDictionary(x => x.Key, x => x.First().CurrencySymbol);
        }

        public static bool TryGetCurrencySymbol(
            string isoCurrencySymbol,
            out string symbol)
        {
            return Map.TryGetValue(isoCurrencySymbol, out symbol);
        }
    }
}