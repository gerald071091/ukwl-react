using System;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace AFT.WebCore.Utils
{
    public class XmlParser
    {
        public static string UTF8ByteArrayToString(byte[] chars)
        {
            return new UTF8Encoding().GetString(chars);
        }

        public static Byte[] StringToUTF8ByteArray(string xmlString)
        {
            return new UTF8Encoding().GetBytes(xmlString);
        }

        public static T DeserializeXmlObject<T>(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(T));
            using (MemoryStream ms = new MemoryStream(StringToUTF8ByteArray(xml)))
            {
                return (T)xs.Deserialize(ms);
            }
        }

        public static T DeserializeXmlObject<T>(Stream stream) where T : class, new()
        {
            XmlSerializer xs = new XmlSerializer(typeof(T));
            using (TextReader reader = new StreamReader(stream))
            {
                return (T)xs.Deserialize(reader);
            }
        }
    }
}
