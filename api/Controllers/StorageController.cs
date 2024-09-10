using erpPlanner.Model;
using erpPlanner.Repository;
using Microsoft.AspNetCore.Mvc;

namespace erpPlanner.Controllers;

[ApiController]
[Route("[controller]")]
public class StorageController : GenericController<Storage>
{
    public StorageController(GenericRepository<Storage> repo)
        : base(repo) { }
}
