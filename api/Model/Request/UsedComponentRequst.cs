using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class UsedComponentRequest : BaseModel
{
    public int ProjectId { get; set; }
    public int ComponentId { get; set; }
    public int Count { get; set; }
    public double TotalPrice { get; set; }
}
