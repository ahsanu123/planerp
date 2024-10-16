using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ResourceDocumentController : GenericController<ResourceDoc>
{
    public ResourceDocumentController(GenericRepository<ResourceDoc> repo)
        : base(repo) { }
}
