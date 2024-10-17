using System.ComponentModel;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;
using QRCoder;
using SqlKata;
using SqlKata.Compilers;

namespace Planerp.Controllers;

class SomeTableName
{
    public int Score { get; set; }
    public int IsPublished { get; set; }
}

[ApiController]
[Route("[controller]")]
public class SqlKataController : ControllerBase
{
    private IProjectRepository _projectRepo;

    public SqlKataController(IProjectRepository projectRepo)
    {
        this._projectRepo = projectRepo;
    }

    [HttpGet]
    [Route("Insert")]
    public async Task<IActionResult> InsertQuery()
    {
        var postgresCompiler = new PostgresCompiler();
        var query = new Query(nameof(SomeTableName))
            .WhereFalse(nameof(SomeTableName.IsPublished))
            .Where(nameof(SomeTableName.Score), SqlConstant.GreatherThan, new { id = 2 });

        var compileResult = postgresCompiler.Compile(query);

        var testDapperQuery = new Query("project").Where("Id", 20).Select("*");

        var queryResult = await this._projectRepo.GetProjects(testDapperQuery);
        return Ok(queryResult);
    }

    [HttpGet]
    [Route("QRCode")]
    public async Task<IActionResult> GetQRCode()
    {
        using (QRCodeGenerator qrGenerator = new QRCodeGenerator())
        using (
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(
                "The text which should be encoded.",
                QRCodeGenerator.ECCLevel.Q
            )
        )
        using (PngByteQRCode qrCode = new PngByteQRCode(qrCodeData))
        {
            byte[] qrCodeImage = qrCode.GetGraphic(20);
            var contentResult = new FileContentResult(qrCodeImage, MediaTypeNames.Image.Png);
            return contentResult;
        }
    }

    [HttpGet]
    [Route("ListClass")]
    public async Task<IActionResult> GetListClass()
    {
        // (new LoggerModel())
        // (new ProducingStep())
        // (new Project())
        // (new ResourceDoc())
        // (new Storage())
        // (new Component());
        var project = new Project();
        var keyVal = new Dictionary<string, object>();

        foreach (var prop in project.GetType().GetProperties())
        {
            keyVal.Add(prop.Name, prop.ToString());
        }

        return Ok(keyVal);
    }
}
