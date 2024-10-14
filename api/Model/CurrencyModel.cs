using TypeGen.Core.TypeAnnotations;

namespace erpPlanner.Model;

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class Currency
{
    public string time { get; set; }
    public CurrencyItem[] Cube { get; set; }
}

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class CurrencyItem
{
    public string currency { get; set; }
    public float rate { get; set; }
}
