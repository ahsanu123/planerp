namespace Planerp.Model;

public class StockHistory : BaseModel
{
    public double Count { get; set; }
    public DateTime StockDate { get; set; }
    public int? ComponentId { get; set; }
}
