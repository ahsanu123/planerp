using System.Security.Claims;

namespace Learn.AppIdentity;

public class AppUser
{
    public int Id { get; set; }

    public string UserName { get; set; }

    public string NormalizedUserName { get; set; }

    public IList<Claim> Claims { get; set; }
}