using System.Globalization;

namespace AFT.WebCore.Utils
{
    public class CultureUtility
    {
        public virtual string GetCultureCode()
        {
            return CultureInfo.CurrentCulture.Name.ToLower();
        }
    }
}