using System.Xml;
using erpPlanner.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace erpPlanner.Controllers;

[ApiController]
[Route("Currency/")]
public class CurrencyController : Controller
{
    /// <summary>
    /// Get Currency from ecb.europa.eu in euro
    /// </summary>
    [Route("GetRawCurrency")]
    [HttpGet]
    public async Task<ActionResult<Currency>> GetRawCurrency()
    {
        string url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
        var xmlDoc = new XmlDocument();

        await Task.Run(() => xmlDoc.Load(url));

        var stringJson = JsonConvert.SerializeXmlNode(xmlDoc);
        stringJson = stringJson.Replace("@", "");
        var jObjectJson = JObject.Parse(stringJson);
        var xml = jObjectJson["gesmes:Envelope"]["Cube"]["Cube"].ToObject<Currency>();

        return Ok(xml);
    }
}
