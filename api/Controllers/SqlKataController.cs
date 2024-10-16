using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using SqlKata;
using SqlKata.Compilers;

namespace Planerp.Controllers;

class SomeTableName
{
    public int Score { get; set; }
}

[ApiController]
[Route("[controller]")]
public class SqlKataController : ControllerBase
{
    public SqlKataController() { }

    [HttpGet]
    [Route("Insert")]
    public async Task<IActionResult> InsertQuery()
    {
        var postgresCompiler = new PostgresCompiler();
        var query = new Query(nameof(SomeTableName))
            .WhereFalse("IsPublished")
            .Where(nameof(SomeTableName.Score), SqlConstant.GreatherThan, new { id = 2 });

        var compileResult = postgresCompiler.Compile(query);
        return Ok(new { sql = compileResult.Sql, binding = compileResult.Bindings });
    }
}
