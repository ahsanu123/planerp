using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
[Authorize]
public class UserManagerController : Controller
{
    private UserManager<IdentityUserIntKey> _userManager;

    public UserManagerController(UserManager<IdentityUserIntKey> userManager)
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
    [Route("create-user")]
    [AllowAnonymous]
    public async Task<ActionResult> CreateUser([FromBody] LoginModel newUser)
    {
        var user = new IdentityUserIntKey()
        {
            UserName = "Ahsanu",
            Email = "ahsanu@amala.com",
            EmailConfirmed = true,
        };
        var result = await _userManager.CreateAsync(user);
        // var isEmailExists = await _userManager.FindByEmailAsync(newUser.Email);
        // var result = await _userManager.CreateAsync(r);
        // if (result.Succeeded)
        return result.Succeeded ? Ok(result) : BadRequest(result);
        // return BadRequest();
    }

    [HttpGet]
    [Route("get-user")]
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
        // foreach (var user in users)
        // {
        //     await _userManager.CreateAsync(user);
        // }
        return Ok();
    }

    [HttpGet]
    [Route("user-info")]
    public async Task<ActionResult> GetUserInformation()
    {
        var ident = User.Claims;
        var claims = new Dictionary<string, string>();
        foreach (var claim in ident)
        {
            claims.Add(claim.Type, claim.Value);
        }
        return Ok(claims);
    }
}
