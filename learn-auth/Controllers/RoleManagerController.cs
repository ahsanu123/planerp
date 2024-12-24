using Learn.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
public class RoleManagerController : Controller
{
    // TODO: Implement This Endpoint
    // - createRole
    // - getRole
    // - getRoleForUser
    // - getUserForRole
    // - updateRole
    // - deleteRole

    private RoleManager<IdentityRoleIntKey> _roleManager;
    private UserManager<IdentityUserIntKey> _userManager;
    private IRoleStore<IdentityRoleIntKey> _roleStore;
    private IUserStore<IdentityUserIntKey> _userStore;

    public RoleManagerController(
        RoleManager<IdentityRoleIntKey> roleManager,
        UserManager<IdentityUserIntKey> userManager,
        IRoleStore<IdentityRoleIntKey> roleStore,
        IUserStore<IdentityUserIntKey> userStore
    )
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _roleStore = roleStore;
        _userStore = userStore;
    }

    [HttpPost]
    [Route("create-role")]
    public async Task<ActionResult> CreateRole([FromBody] IdentityRoleIntKey role)
    {
        var result = await _roleManager.CreateAsync(role);
        return Ok(result);
    }

    [HttpGet]
    [Route("get-role")]
    public async Task<ActionResult> GetRole([FromQuery] int id)
    {
        return Ok();
    }

    [HttpPost]
    [Route("get-role-for-user")]
    public async Task<ActionResult> GetRoleForUser([FromBody] IdentityUserIntKey user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }

    [HttpGet]
    [Route("get-user-for-role")]
    public async Task<ActionResult> GetUserForRole()
    {
        return Ok();
    }

    [HttpPost]
    [Route("update-role")]
    public async Task<ActionResult> UpdateRole()
    {
        return Ok();
    }

    [HttpDelete]
    [Route("delete-role")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult> DeleteRole()
    {
        return Ok();
    }
}
