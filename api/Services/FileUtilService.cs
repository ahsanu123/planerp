using erpPlanner.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Renci.SshNet;

namespace erpPlanner.Services;

public class FileUtilService
{
    private readonly IConfiguration _configuration;
    private readonly Sftp _sftpConfig;

    public FileUtilService(IConfiguration configuration)
    {
        _configuration = configuration;
        _sftpConfig = _configuration.GetSection("Sftp").Get<Sftp>();
    }

    public async Task<string> UploadFile(IFormFile file)
    {
        var filename = $"{Guid.NewGuid()}-{file.FileName}".Replace(" ", "_");
        string fileType;
        var mime = new FileExtensionContentTypeProvider().TryGetContentType(filename, out fileType);

        string targetFileLocation = fileType.StartsWith("image/")
            ? _sftpConfig.ImagePath
            : _sftpConfig.ResourceDocsPath;

        using (var client = new SftpClient(_sftpConfig.Host, _sftpConfig.User, _sftpConfig.Pass))
        {
            client.Connect();
            var directoryExists = client.Exists(
                Path.Combine(_sftpConfig.BasePath, targetFileLocation)
            );
            if (!directoryExists)
            {
                client.CreateDirectory(Path.Combine(_sftpConfig.BasePath, targetFileLocation));
            }
            client.UploadFile(
                file.OpenReadStream(),
                Path.Combine(_sftpConfig.BasePath, targetFileLocation, filename)
            );
        }
        return filename;
    }

    public async Task<FileContentResult> GetFile(string fileName)
    {
        String fileExtension = Path.GetExtension(fileName);
        String temporaryFileName = Path.Combine(
            Path.GetTempPath(),
            $"tempImageFile{fileExtension}"
        );

        string contentType;
        var mime = new FileExtensionContentTypeProvider().TryGetContentType(
            fileName,
            out contentType
        );

        using (var client = new SftpClient(_sftpConfig.Host, _sftpConfig.User, _sftpConfig.Pass))
        {
            var file = new FileStream(temporaryFileName, FileMode.Create, FileAccess.ReadWrite);
            client.Connect();
            try
            {
                client.DownloadFile(
                    Path.Combine(
                        _sftpConfig.BasePath,
                        contentType.StartsWith("image/")
                            ? _sftpConfig.ImagePath
                            : _sftpConfig.ResourceDocsPath,
                        fileName
                    ),
                    file
                );
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        var fileByte = await System.IO.File.ReadAllBytesAsync(temporaryFileName);

        var contentResult = new FileContentResult(fileByte, contentType);
        return contentResult;
    }
}
