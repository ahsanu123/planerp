using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectPageController : ControllerBase
{
    private GenericRepository<Project> _projectRepo;
    private IProjectPageRepository _projectDetailRepo;

    public ProjectPageController(
        GenericRepository<Project> projectRepo,
        IProjectPageRepository projectDetailRepo
    )
    {
        this._projectRepo = projectRepo;
        this._projectDetailRepo = projectDetailRepo;
    }

    [HttpGet]
    [Route("details/{id}")]
    public async Task<IActionResult> GetProjectDetails([FromRoute] int id)
    {
        var projectDetails = await this._projectDetailRepo.GetProjectPageDetail(id);
        if (projectDetails.Project == null)
        {
            return NotFound();
        }
        return Ok(projectDetails);
    }
}
