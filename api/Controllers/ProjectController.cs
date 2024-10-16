using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : GenericController<Project>
{
    public ProjectController(GenericRepository<Project> repo)
        : base(repo) { }
}
