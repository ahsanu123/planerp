using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class UsedComponent : BaseModel
{
    public int ProjectId { get; set; }
    public int Count { get; set; }
    public double TotalPrice { get; set; }
}
