namespace Planerp.Model;

public class ComponentPriceHistory
{
    public string Path { get; set; }
    public string Url { get; set; }
    public int ComponentId { get; set; }
}

public class ComponentPriceLists
{
    public double Price { get; set; }
    public DateTime PriceDate { get; set; }
    public int ComponentId { get; set; }
}
