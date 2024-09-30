using System.IO;
using System.Net.Mime;
using erpPlanner.Model;
using erpPlanner.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Renci.SshNet;

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
    /// Upload Resource Documentation via SFTP
    /// </summary>
    [HttpPost]
    [Route("resource")]
    public async Task<ActionResult> UploadResource(IFormFile res)
    {
        var filename = await _fileUtil.UploadResourceDocument(res);
        return Ok(filename);
    }

    /// <summary>
    /// Upload Image via SFTP
    /// </summary>
    [HttpPost]
    [Route("image")]
    public async Task<ActionResult> UploadImage(IFormFile image)
    {
        var filename = $"{Guid.NewGuid()}_{image.FileName}".Replace(" ", "_");
        using (var client = new SftpClient(_sftpConfig.Host, _sftpConfig.User, _sftpConfig.Pass))
        {
            client.Connect();
            var directoryExists = client.Exists(
                Path.Combine(_sftpConfig.BasePath, _sftpConfig.ImagePath)
            );

            if (!directoryExists)
            {
                client.CreateDirectory(Path.Combine(_sftpConfig.BasePath, _sftpConfig.ImagePath));
            }

            client.UploadFile(
                image.OpenReadStream(),
                Path.Combine(_sftpConfig.BasePath, _sftpConfig.ImagePath, filename)
            );
        }
        return Ok(filename);
    }

    /// <summary>
    /// Download Image By File Name
    /// </summary>
    [HttpGet]
    [Route("image")]
    public async Task<ActionResult> GetImage([FromQuery] string fileName)
    {
        String fileExtension = Path.GetExtension(fileName);
        String temporaryFileName = Path.Combine(
            Path.GetTempPath(),
            $"tempImageFile{fileExtension}"
        );

        using (var client = new SftpClient(_sftpConfig.Host, _sftpConfig.User, _sftpConfig.Pass))
        {
            var file = new FileStream(temporaryFileName, FileMode.Create, FileAccess.ReadWrite);
            client.Connect();
            try
            {
                client.DownloadFile(
                    Path.Combine(_sftpConfig.BasePath, _sftpConfig.ImagePath, fileName),
                    file
                );
            }
            catch (System.Exception)
            {
                return NotFound(
                    new ErrorModel() { error = $"{fileName} NotFound", reason = "file NotFound" }
                );
            }
        }
        string contentType;
        var mime = new FileExtensionContentTypeProvider().TryGetContentType(
            fileName,
            out contentType
        );

        var fileByte = await System.IO.File.ReadAllBytesAsync(temporaryFileName);
        if (String.IsNullOrEmpty(contentType))
            return StatusCode(500);

        return File(fileByte, contentType);
    }
}
