namespace Planerp.Model;

public class TaskModel : BaseModel
{
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool Repeatable { get; set; }
    public int PriorityLevel { get; set; }
    public string Description { get; set; }
}
