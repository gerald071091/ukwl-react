using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace AFT.WebCore.Dtos.Utility
{
    [Serializable]
    [XmlRoot("Counters")]
    public class ProgressiveTickers
    {
        [XmlElement("Counter")]
        public List<ProgressiveTicker> ProgressiveTicker { get; set; }
    }

    [Serializable]
    [XmlRoot("Counter")]
    public class ProgressiveTicker
    {
        private string _jackpotName;

        [XmlElement("jackpotID")]
        public string JackpotId { get; set; }

        [XmlElement("jackpotName")]
        public string JackpotName
        {
            get { return _jackpotName.Trim(' '); }
            set { _jackpotName = value; }
        }

        [XmlElement("jackpotCValue")]
        public string JackpotCValue { get; set; }

        [XmlElement("value_dif")]
        public int ValueDiff { get; set; }

        [XmlElement("changeTime")]
        public int ChangeTime { get; set; }

        [XmlElement("updatePeriod")]
        public int UpdatePeriod { get; set; }

        [XmlElement("moduleID")]
        public string ModuleId { get; set; }
    }
}
