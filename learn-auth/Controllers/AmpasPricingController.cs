using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.AmpasController;

[ApiController]
[Route("[controller]")]
[AllowAnonymous]
public class AmpasPricingController : Controller
{
    [HttpGet]
    [Route("ampas-pricing")]
    public async Task<ActionResult> GetAmpasPricing()
    {
        return Ok();
    }
}
