namespace Learn.Controller;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[Authorize]
public class WeatherController : ControllerBase
{
    [HttpGet]
    [Route("authorized-endpoint-weather")]
    public async Task<ActionResult> GetWeatherAuthorized()
    {
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("weather-endpoint")]
    public async Task<ActionResult> GetWeather()
    {
        return Ok();
    }
}
