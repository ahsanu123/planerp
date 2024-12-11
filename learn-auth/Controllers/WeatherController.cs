namespace Learn.Controller;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
// [Authorize]
public class WeatherController : Controller
{
    [Authorize(Roles = "Administrator")]
    [HttpGet]
    [Route("authorized-endpoint-weather")]
    public async Task<ActionResult> GetWeatherAuthorized()
    {
        return Ok();
    }

    [HttpGet]
    [Route("weather-endpoint")]
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
