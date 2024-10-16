using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class ProducingStep : BaseModel
{
    public string ListStep { get; set; }
    public int? ProjectId { get; set; }
}
