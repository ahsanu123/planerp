namespace Learn.Controller;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class WeatherController : Controller
{
    [Authorize(Roles = "Administrator")]
    [HttpGet]
    [Route("authorized-weather")]
    public async Task<ActionResult> GetWeatherAuthorized()
    {
        var context = this.HttpContext;
        var authReporterData =
            context.Items["authReport"] ?? new Dictionary<(string, string), bool>();

        return Ok(JsonConvert.SerializeObject(authReporterData, Formatting.Indented));
    }

    [HttpGet]
    [Route("weather")]
    public async Task<ActionResult> GetWeather()
    {
        return Ok();
    }

    [HttpGet]
    [Route("user")]
    public async Task<ActionResult> ShowUser([FromQuery] string user)
    {
        return Ok(user);
    }
}
