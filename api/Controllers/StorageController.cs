using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class StorageController : GenericController<Storage>
{
    public StorageController(GenericRepository<Storage> repo)
        : base(repo) { }
}
