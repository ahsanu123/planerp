using System.ComponentModel.DataAnnotations;
using TypeGen.Core.TypeAnnotations;

namespace erpPlanner.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public abstract class BaseModel
{
    [Key]
    public int? Id { get; set; }
}
