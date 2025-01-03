namespace AMS.Model;

public class AmpasModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime ProductionDate { get; set; }
    public DateTime TakenTime { get; set; }
    public string Description { get; set; } = "";
}
