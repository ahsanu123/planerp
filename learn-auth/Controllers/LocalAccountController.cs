using AMS.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class LocalAccountController : Controller
{
    // TODO:
    // Register
    // Login
    // Logout

    private SignInManager<IdentityUserIntKey> _signinManager;
    private UserManager<IdentityUserIntKey> _userManager;

    public LocalAccountController(
        SignInManager<IdentityUserIntKey> signInManager,
        UserManager<IdentityUserIntKey> userManager
    )
    {
        _signinManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register(
        [FromBody] IdentityUserIntKey user,
        [FromQuery] string password
    )
    {
        var result = await _userManager.CreateAsync(user, password);
        return Ok(result);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login([FromQuery] string username, [FromBody] string password)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
            return NotFound();
        var result = await _signinManager.PasswordSignInAsync(user, password, false, false);
        return Ok(result);
    }

    [HttpGet]
    [Route("logout")]
    public async Task<ActionResult> Logout()
    {
        await _signinManager.SignOutAsync();
        return Ok();
    }
}
