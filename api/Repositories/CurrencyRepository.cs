using System.Xml;
using Newtonsoft.Json;

namespace Planerp.Repository;

public interface ICurrencyRepository
{
    public Task<string> GetRawCurrency();
}

public class CurrencyRepostory : ICurrencyRepository
{
    public async Task<string> GetRawCurrency()
    {
        string url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
        var xmlDoc = new XmlDocument();
        xmlDoc.Load(url);

        var convertedJson = JsonConvert.SerializeXmlNode(xmlDoc);
        return convertedJson;
    }
}
