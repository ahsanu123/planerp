using Learn.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
public class LoginInfoController : Controller
{
    private SignInManager<IdentityUserIntKey> _signinManager;

    public LoginInfoController(SignInManager<IdentityUserIntKey> signInManager)
    {
        _signinManager = signInManager;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult> GetExternalLoginInfo()
    {
        var externalLogins = await _signinManager.GetExternalLoginInfoAsync();
        return Ok(externalLogins == null ? "no list" : externalLogins);
    }
}
