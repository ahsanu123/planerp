using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectPageController : ControllerBase
{
    private GenericRepository<Project> _projectRepo;
    private GenericRepository<Component> _componentRepo;
    private GenericRepository<LoggerModel> _loggerRepo;
    private IProjectPageRepository _projectDetailRepo;

    public ProjectPageController(
        GenericRepository<Project> projectRepo,
        GenericRepository<Component> componentRepo,
        GenericRepository<LoggerModel> loggerRepo,
        IProjectPageRepository projectDetailRepo
    )
    {
        this._projectRepo = projectRepo;
        this._projectDetailRepo = projectDetailRepo;
        this._componentRepo = componentRepo;
        this._loggerRepo = loggerRepo;
    }

    [HttpGet]
    [Route("details/{projectId}")]
    public async Task<IActionResult> GetProjectDetails([FromRoute] int projectId)
    {
        var projectDetails = await this._projectDetailRepo.GetProjectPageDetail(projectId);
        if (projectDetails.Project == null)
        {
            return NotFound();
        }
        return Ok(projectDetails);
    }

    [HttpPost]
    [Route("add-component")]
    public async Task<IActionResult> AddComponentToProject([FromBody] UsedComponent usedComponent)
    {
        var isProjectExists = await this._projectRepo.Get(usedComponent.ProjectId);
        if (isProjectExists == null)
            return NotFound(new ErrorModel { error = "404", reason = "Project NotFound" });

        var isComponentExists = await this._componentRepo.Get(usedComponent.ComponentId);
        if (isComponentExists == null)
            return NotFound(new ErrorModel { error = "404", reason = "Component NotFound" });

        await this._projectDetailRepo.AddIdToDatabaseArray(
            new ArrayDatabaseRelation
            {
                ProjectId = usedComponent.ProjectId,
                ComponentId = usedComponent.ComponentId,
            }
        );
        await this._projectDetailRepo.AddUsedComponent(usedComponent);

        return Ok();
    }

    [HttpPost]
    [Route("add-Logger")]
    public async Task<IActionResult> AddLoggerToProject(
        [FromQuery] int projectId,
        [FromQuery] int loggerId
    )
    {
        var isProjectExists = await this._projectRepo.Get(projectId);
        if (isProjectExists == null)
            return NotFound(new ErrorModel { error = "404", reason = "Project NotFound" });

        var isLoggerExist = await this._loggerRepo.Get(loggerId);
        if (isLoggerExist == null)
            return NotFound(new ErrorModel { error = "404", reason = "Logger NotFound" });

        await this._projectDetailRepo.AddIdToDatabaseArray(
            new ArrayDatabaseRelation { ProjectId = projectId, LoggerModelId = loggerId }
        );

        return Ok();
    }
}
