namespace Learn.Controller;

using System.Security.Claims;
using Learn.AppIdentity;
using Learn.UserClaim;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController : Controller
{
    private UserManager<AppUser> _userManager;

    public UserController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

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

    [HttpPost]
    [Route("create")]
    [AllowAnonymous]
    public async Task<ActionResult> CreateUser([FromBody] AppUser newUser)
    {
        var result = await _userManager.CreateAsync(newUser);
        if (result.Succeeded)
            return Ok();
        return BadRequest();
    }

    [HttpGet]
    [Route("get-user")]
    [AllowAnonymous]
    public async Task<ActionResult> GetUser([FromQuery] string userName)
    {
        var result = await _userManager.FindByNameAsync(userName);
        if (result != null)
            return Ok(result);
        return NotFound();
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("seed")]
    public async Task<ActionResult> SeedUser()
    {
        var users = new List<AppUser>
        {
            new AppUser
            {
                Id = 1,
                UserName = "Nozzle",
                NormalizedUserName = "nozzle",
            },
            new AppUser
            {
                Id = 2,
                UserName = "Alice",
                NormalizedUserName = "alice",
            },
            new AppUser
            {
                Id = 3,
                UserName = "Bob",
                NormalizedUserName = "bob",
            },
        };
        foreach (var user in users)
        {
            await _userManager.CreateAsync(user);
        }
        return Ok();
    }
}
