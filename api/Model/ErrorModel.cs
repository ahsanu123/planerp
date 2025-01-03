using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class ErrorModel
{
    public string error { get; set; }
    public string reason { get; set; }
}
