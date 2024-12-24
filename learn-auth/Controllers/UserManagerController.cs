using Learn.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

    public UserManagerController(UserManager<IdentityUserIntKey> userManager)
    {
        _userManager = userManager;
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
