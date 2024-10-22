namespace Planerp.Model;

public class PriceHistory : BaseModel
{
    public double Price { get; set; }
    public DateTime PriceDate { get; set; }
    public int? ComponentId { get; set; }
}
