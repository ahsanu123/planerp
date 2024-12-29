using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

// [ApiController]
[Route("[controller]")]
public class AccountController : Controller
{
    private SignInManager<IdentityUserIntKey> _signInManager;

    public AccountController(SignInManager<IdentityUserIntKey> signinManager)
    {
        _signInManager = signinManager;
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ExternalLogin")]
    public IActionResult ExternalLogin(string provider, string returnUrl)
    {
        // RedirectUri = Url.Action("external-login-info", "LoginInfo"),
        var redirectUrl = Url.Action(
            "ExternalLoginCallback",
            "Account",
            new { ReturnUrl = returnUrl }
        );

        var properties = _signInManager.ConfigureExternalAuthenticationProperties(
            provider,
            redirectUrl
        );

        return new ChallengeResult(provider, properties);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ExternalLoginCallback")]
    public async Task<IActionResult> ExternalLoginCallback(
        string? returnUrl = null,
        string? remoteError = null
    )
    {
        var loginInfo = await _signInManager.GetExternalLoginInfoAsync();

        return Ok(loginInfo?.Principal.FindFirstValue(ClaimTypes.Email));
    }

    [HttpGet]
    [Route("login-get")]
    [AllowAnonymous]
    public async Task<ActionResult> LoginGet()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action("external-login-info", "LoginInfo"),
        };
        return new ChallengeResult(GoogleDefaults.AuthenticationScheme, properties);
    }

    //
    // [HttpGet]
    // [Route("after-auth")]
    // public async Task<ActionResult> AfterAuth()
    // {
    //     var externalLogins = await _signInManager.GetExternalLoginInfoAsync();
    //     return Ok(externalLogins == null ? "Nah" : externalLogins);
    // }

    [HttpPost]
    [Route("try-redirect")]
    public async Task<ActionResult> TryRedirect()
    {
        // Response.Redirect("http://localhost:5173/page/signin-page");
        return Redirect("http://localhost:5173/");
    }
}
