using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class LoggerModel : BaseModel
{
    public DateTime Date { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public int? ProjectId { get; set; }
}
