using System.IO;
using System.Net.Mime;
using erpPlanner.Model;
using erpPlanner.Services;
using Microsoft.AspNetCore.Mvc;
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

    [HttpGet]
    [Route("image")]
    public async Task<ActionResult> GetImage()
    {
        String fileName = "2caee324-fec0-4ad5-bdd4-19a9940606e2_bremco2.jpg";
        String newFileName = Path.Combine(Path.GetTempPath(), "downloadedImage.png");

        using (var client = new SftpClient(_sftpConfig.Host, _sftpConfig.User, _sftpConfig.Pass))
        {
            var file = new FileStream(newFileName, FileMode.Create, FileAccess.ReadWrite);
            client.Connect();
            client.DownloadFile(
                Path.Combine(_sftpConfig.BasePath, _sftpConfig.ImagePath, fileName),
                file
            );
            return Ok(Url.Content(newFileName));
        }
    }
}
