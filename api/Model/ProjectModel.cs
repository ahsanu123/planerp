using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class Project : BaseModel
{
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? DeadLineDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public DateTime? FinishedDate { get; set; }
    public float? SellPrice { get; set; }
    public float Capital { get; set; }
    public bool Fail { get; set; }
    public bool Finish { get; set; }
    public float? ProfitInPersen { get; set; }
    public string? Description { get; set; }

    // public List<string> ListComponent { get; set; }

    public int? LoggerModelId { get; set; }
    public int? ComponentId { get; set; }
}
