using Learn.Model;
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
    // TODO: Implement This Endpoint
    // - refresh
    // - info
    // - createUser
    // - getUsers
    // - updateUser
    // - deleteUser

    private UserManager<IdentityUserIntKey> _userManager;
    private SignInManager<IdentityUserIntKey> _signinManager;

    public UserManagerController(
        UserManager<IdentityUserIntKey> userManager,
        SignInManager<IdentityUserIntKey> signInManager
    )
    {
        _userManager = userManager;
        _signinManager = signInManager;
    }

    [HttpGet]
    [Route("sign-out")]
    public async Task<ActionResult> SignOutUser()
    {
        await _signinManager.SignOutAsync();
        return Ok();
    }

    [HttpPost]
    [Route("mock-authenticate")]
    [AllowAnonymous]
    public async Task<ActionResult> MockAuthenticate()
    {
        var mockUser = new IdentityUserIntKey
        {
            Id = 1,
            UserName = "Ahsanu_Amala",
            Email = "ahsanuamala@gmail.com",
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString(),
        };

        IdentityUserIntKey? user = await _userManager.FindByEmailAsync(mockUser.Email);

        if (user == null)
        {
            await _userManager.CreateAsync(mockUser);
        }
        await _signinManager.SignInAsync(user, true);

        return Ok();
    }

    [HttpGet]
    [Route("who-am-i")]
    [AllowAnonymous]
    public async Task<ActionResult> GetUserInformation()
    {
        return Ok(
            User.Claims.Select(claim => new { Type = claim.Type, Value = claim.Value }).ToList()
        );
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<ActionResult> RefreshToken()
    {
        return Ok();
    }

    [HttpPost]
    [Route("user-info")]
    public async Task<ActionResult> GetUserInfo([FromQuery] string id)
    {
        var user = _userManager.FindByIdAsync(id);
        return Ok(user);
    }

    [HttpPost]
    [Route("create-user")]
    public async Task<ActionResult> CreateUser([FromBody] IdentityUserIntKey user)
    {
        var result = await _userManager.CreateAsync(user);
        return Ok(result);
    }

    [HttpGet]
    [Route("get-users")]
    public async Task<ActionResult> GetAllUser()
    {
        var users = _userManager.Users;
        return Ok(users);
    }

    [HttpPost]
    [Route("update-user")]
    public async Task<ActionResult> UpdateUser()
    {
        return Ok();
    }

    [HttpDelete]
    [Route("delete-user")]
    public async Task<ActionResult> DeleteUser()
    {
        return Ok();
    }
}
