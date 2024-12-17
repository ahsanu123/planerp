namespace Learn.Model;

public class ClaimModel
{
    public int AppUserId { get; set; }

    public int Id { get; set; }
    public string? ClaimValue { get; set; }
    public string ClaimType { get; set; }
}
