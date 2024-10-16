using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class LoggerController : GenericController<LoggerModel>
{
    public LoggerController(GenericRepository<LoggerModel> repo)
        : base(repo) { }
}
