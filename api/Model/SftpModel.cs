namespace Planerp.Model;

public class Sftp
{
    public required string Host { get; set; }
    public required string User { get; set; }
    public required string Pass { get; set; }
    public required string BasePath { get; set; }
    public required string ImagePath { get; set; }
    public required string ResourceDocsPath { get; set; }
}
