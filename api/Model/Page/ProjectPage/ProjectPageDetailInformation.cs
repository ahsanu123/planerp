namespace Planerp.Model;

public class ProjectPageDetailInformation
{
    public Project Project { get; set; }
    public IEnumerable<LoggerModel> ListLog { get; set; }
    public IEnumerable<Component> ListComponent { get; set; }
}
