namespace Learn.Controller;

using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class SignController : Controller
{
    [HttpGet]
    [Route("sign-in")]
    [AllowAnonymous]
    public async Task<ActionResult> SignIn([FromQuery] string user)
    {
        var context = this.HttpContext;
        var requestUser = context.Request.Query["user"];

        if (!String.IsNullOrEmpty(requestUser))
        {
            var claim = new Claim(ClaimTypes.Name, user);
            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);

            identity.AddClaim(claim);
            var principal = new ClaimsPrincipal(identity);

            await context.SignInAsync(principal);
            return Ok();
        }
        else
        {
            await context.ChallengeAsync();
            return Forbid();
        }
    }

    [HttpGet]
    [Route("sign-out")]
    [AllowAnonymous]
    public async Task<ActionResult> SignOut()
    {
        await this.HttpContext.SignOutAsync();
        return Ok();
    }
}
