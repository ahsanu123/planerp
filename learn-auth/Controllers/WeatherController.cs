namespace Learn.Controller;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("[controller]")]
[Authorize]
public class WeatherController : Controller
{
    // [Authorize(Roles = "Administrator")]
    [HttpGet]
    [Route("authorized-weather")]
    public async Task<ActionResult> GetWeatherAuthorized()
    {
        return Ok(GetAuthReportData());
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("weather")]
    // [Authorize(Roles = "SpecialGuest")]
    public async Task<ActionResult> GetWeather()
    {
        return Ok(GetAuthReportData());
    }

    private string GetAuthReportData()
    {
        var context = this.HttpContext;
        var authReporterData =
            context.Items["authReport"] ?? new Dictionary<(string, string), bool>();

        return JsonConvert.SerializeObject(authReporterData, Formatting.Indented);
    }
}
