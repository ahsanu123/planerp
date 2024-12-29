using Learn.Model;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
public class AccountController : Controller
{
    private SignInManager<IdentityUserIntKey> _signInManager;

    public AccountController(SignInManager<IdentityUserIntKey> signinManager)
    {
        _signInManager = signinManager;
    }

    [HttpPost]
    [Route("Login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login([FromQuery] string returnUrl)
    {
        // var redirectUrl = Url.Page(
        //     "./ExternalLogin",
        //     pageHandler: "Callback",
        //     values: new { returnUrl }
        // );
        var redirectUrl = Url.Action("/RoleManager/get-roles");
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(
            GoogleDefaults.AuthenticationScheme,
            redirectUrl
        );
        return new ChallengeResult(GoogleDefaults.AuthenticationScheme, properties);
    }
}
