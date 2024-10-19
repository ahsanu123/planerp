using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class ValueController : GenericController<Value>
{
    public ValueController(GenericRepository<Value> repo)
        : base(repo) { }
}
