namespace Learn.Controller;

using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class SignController : Controller
{
    [HttpGet]
    [Route("sign-in")]
    public async Task<ActionResult> SignIn([FromQuery] string user)
    {
        var context = this.HttpContext;
        var requestUser = context.Request.Query["user"];

        if (!String.IsNullOrEmpty(requestUser))
        {
            var claim = new Claim(ClaimTypes.Name, user);
            var identity = new ClaimsIdentity("qsv");

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
    public async Task<ActionResult> SignOut()
    {
        await this.HttpContext.SignOutAsync();
        return Ok();
    }
}
