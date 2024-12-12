namespace Learn.AppIdentity;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string UserName { get; set; }

    public string NormalizedUserName { get; set; }
}
