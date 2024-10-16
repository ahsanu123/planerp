using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class ResourceDoc : BaseModel
{
    public string Overview { get; set; }
    public string Description { get; set; }
}
