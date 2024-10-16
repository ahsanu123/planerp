using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductionStepController : GenericController<ProducingStep>
{
    public ProductionStepController(GenericRepository<ProducingStep> repo)
        : base(repo) { }
}
