using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
[AllowAnonymous]
public class LoginInfoController : Controller
{
    private SignInManager<IdentityUserIntKey> _signinManager;

    public LoginInfoController(SignInManager<IdentityUserIntKey> signInManager)
    {
        _signinManager = signInManager;
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ExternalLoginInfo")]
    public async Task<ActionResult> GetExternalLoginInfo()
    {
        // var externalLogins = await _signinManager.GetExternalAuthenticationSchemesAsync();
        var externalLogins = await _signinManager.GetExternalLoginInfoAsync();
        return Ok(externalLogins?.Principal.FindFirstValue(ClaimTypes.Email));
    }
}
