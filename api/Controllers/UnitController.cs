using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class UnitController : GenericController<Unit>
{
    public UnitController(GenericRepository<Unit> repo)
        : base(repo) { }
}
