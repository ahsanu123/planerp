using erpPlanner.Model;
using erpPlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace erpPlanner.Controllers;

[ApiController]
[Route("File/")]
public class FileController : Controller
{
    private IConfiguration _configuration;
    private readonly Sftp _sftpConfig;
    private FileUtilService _fileUtil;

    public FileController(IConfiguration configuration, FileUtilService fileUtil)
    {
        _configuration = configuration;
        _fileUtil = fileUtil;
        _sftpConfig = _configuration.GetSection("Sftp").Get<Sftp>();
    }

    /// <summary>
    /// Upload File To SFTP
    /// </summary>
    [HttpPost]
    [Route("file")]
    public async Task<ActionResult> UploadFile(IFormFile file)
    {
        var filename = await _fileUtil.UploadFile(file);
        return Ok(new { fileName = filename });
    }

    /// <summary>
    /// Download file  By File Name
    /// </summary>
    [HttpGet]
    [Route("file")]
    public async Task<ActionResult> GetFile([FromQuery] string fileName)
    {
        var resultFile = await _fileUtil.GetFile(fileName);
        if (resultFile == null)
            return NotFound();
        return resultFile;
    }
}
