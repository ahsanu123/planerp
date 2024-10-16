using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ComponentController : GenericController<Component>
{
    public ComponentController(GenericRepository<Component> repo)
        : base(repo) { }
}
