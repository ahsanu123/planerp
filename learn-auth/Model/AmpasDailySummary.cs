namespace AMS.Model;

public class AmpasDailySummary
{
    public int TotalTaken { get; set; }
    public double TotalTakenPrice { get; set; }
    public List<KeyValuePair<string, int>> UserTakenCount { get; set; }
}
