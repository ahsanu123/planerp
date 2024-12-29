using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
public class AccountController : Controller
{
    private SignInManager<IdentityUserIntKey> _signinManager;
    private UserManager<IdentityUserIntKey> _userManager;

    public AccountController(
        SignInManager<IdentityUserIntKey> signinManager,
        UserManager<IdentityUserIntKey> userManager
    )
    {
        _signinManager = signinManager;
        _userManager = userManager;
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ExternalLogin")]
    public async Task<IActionResult> ExternalLogin(string provider, string returnUrl = "/")
    {
        var externalLoginProvider = (
            await _signinManager.GetExternalAuthenticationSchemesAsync()
        ).FirstOrDefault(scheme => scheme.DisplayName?.ToLower() == provider.ToLower());

        if (externalLoginProvider == null)
        {
            return NotFound();
        }
        provider = externalLoginProvider.DisplayName!;

        var redirectUrl = Url.Action(
            "ExternalLoginCallback",
            "Account",
            new { ReturnUrl = returnUrl }
        );

        var properties = _signinManager.ConfigureExternalAuthenticationProperties(
            provider,
            redirectUrl
        );

        return new ChallengeResult(provider, properties);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ExternalLoginCallback")]
    public async Task<IActionResult> ExternalLoginCallback(string? returnUrl = null)
    {
        var loginInfo = await _signinManager.GetExternalLoginInfoAsync();
        if (loginInfo == null)
            return NotFound();

        var email = loginInfo.Principal.FindFirstValue(ClaimTypes.Email);
        var username = loginInfo.Principal.FindFirstValue(ClaimTypes.Name);
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            await _userManager.CreateAsync(
                new IdentityUserIntKey
                {
                    UserName = username,
                    Email = email,
                    EmailConfirmed = true,
                }
            );

        user = await _userManager.FindByEmailAsync(email);

        await _signinManager.SignInAsync(user, isPersistent: true);

        return Ok();
    }

    [HttpPost]
    [Route("try-redirect")]
    public async Task<ActionResult> TryRedirect()
    {
        // Response.Redirect("http://localhost:5173/page/signin-page");
        return Redirect("http://localhost:5173/");
    }
}
