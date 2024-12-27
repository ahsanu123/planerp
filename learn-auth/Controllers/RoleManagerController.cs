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
    // - addRoleForUser
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
    [Route("add-role-for-user/{userName}")]
    public async Task<ActionResult> AddRoleForUser(
        [FromRoute] string userName,
        [FromBody] string roleName
    )
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        var user = await _userManager.FindByNameAsync(userName);
        if (role != null && user != null)
        {
            var result = await _userManager.AddToRoleAsync(user, role.Name);
            return Ok(result);
        }

        return NotFound();
    }

    [HttpPost]
    [Route("create-role")]
    public async Task<ActionResult> CreateRole([FromBody] IdentityRoleIntKey role)
    {
        var result = await _roleManager.CreateAsync(role);
        return Ok(result);
    }

    [HttpGet]
    [Route("get-roles")]
    public async Task<ActionResult> GetRoles()
    {
        var roles = _roleManager.Roles;
        return Ok(roles);
    }

    [HttpGet]
    [Route("get-role")]
    public async Task<ActionResult> GetRole([FromQuery] int id)
    {
        return Ok();
    }

    [HttpGet]
    [Route("get-role-for-user/{userName}")]
    public async Task<ActionResult> GetRoleForUser([FromRoute] string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user != null)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        return NotFound();
    }

    [HttpGet]
    [Route("is-user-in-role/{userName}")]
    public async Task<ActionResult> IsUserInRole([FromRoute] string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user != null)
        {
            var result = await _userManager.IsInRoleAsync(user, "Baker");
            return Ok(result);
        }
        return NotFound();
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
