using Learn.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learn.LearnController;

[ApiController]
[Route("[controller]")]
[Authorize]
public class AuthorizedTestController : Controller
{
    [HttpGet]
    [Route("baker-info")]
    [Authorize(Roles = RoleConstant.Baker)]
    public async Task<ActionResult> BakerSecret()
    {
        return Ok("Its Baker Secret!!!");
    }

    [HttpGet]
    [Route("baker-administrator")]
    [Authorize(Roles = RoleConstant.Administrator)]
    public async Task<ActionResult> AdministratorSecret()
    {
        return Ok("Its Administrator Secret!!!");
    }

    [HttpGet]
    [Route("super-admin-info")]
    [Authorize(Policy = PolicyConstant.SuperAdmin)]
    public async Task<ActionResult> SuperAdminSecret()
    {
        return Ok("Its Super Admin Secret !!!");
    }
}
