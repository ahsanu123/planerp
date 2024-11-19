using Microsoft.AspNetCore.Mvc;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class UtilController : Controller
{
    private IHttpClientFactory _httpClient;

    public UtilController(IHttpClientFactory httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet]
    public async Task<ActionResult> GetJson(string url)
    {
        var client = _httpClient.CreateClient("GetJson");
        client.DefaultRequestHeaders.Add(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
        );
        client.DefaultRequestHeaders.Add(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0"
        );

        var result = await client.GetAsync(url);
        var jsonString = await result.Content.ReadAsStringAsync();
        return Ok(jsonString);
    }
}
