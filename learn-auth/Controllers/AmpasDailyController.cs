using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.AmpasController;

[ApiController]
[Route("[controller]")]
[AllowAnonymous]
public class AmpasDailyController : Controller
{
    /*
     * TODO: Make Daily Ampas Utility here
     * - AddAmpasAmount -> every day ampas amount
     * - DailySummary -> show how many produced ampas and how many taken ampas by buyer
     *
     * */

    [HttpGet]
    [Route("add-ampas")]
    public async Task<ActionResult> AddAmpasAmount([FromQuery] int amount)
    {
        // only authorized user can request to this endpoint
        // use user credential to insert data into database
        //
        // AmpasRepository.AddAmpasAmount(user, amount)
        return Ok();
    }
}
