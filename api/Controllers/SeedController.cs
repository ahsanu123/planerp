using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class SeedController : ControllerBase
{
    private ISeedRepository _seedRepo;

    public SeedController(ISeedRepository seedRepository)
    {
        this._seedRepo = seedRepository;
    }

    [HttpGet]
    public async Task<IActionResult> SeedDatabase()
    {
        await this._seedRepo.Seed();
        return Ok();
    }
}
