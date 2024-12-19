namespace Learn.LearnController;

using Learn.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("[controller]")]
[Authorize]
public class WeatherController : Controller
{
    private IUserRepository _userRepo;

    public WeatherController(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

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

    [HttpGet]
    [AllowAnonymous]
    [Route("get-all-user")]
    public async Task<ActionResult> GetVersionInfo()
    {
        var result = await _userRepo.GetAll();

        return Ok(result);
    }

    private string GetAuthReportData()
    {
        var context = this.HttpContext;
        var authReporterData =
            context.Items["authReport"] ?? new Dictionary<(string, string), bool>();

        return JsonConvert.SerializeObject(authReporterData, Formatting.Indented);
    }
}
