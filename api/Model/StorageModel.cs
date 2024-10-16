using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class Storage : BaseModel
{
    public string Name { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
}
