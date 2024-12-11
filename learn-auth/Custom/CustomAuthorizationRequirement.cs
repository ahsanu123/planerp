using Microsoft.AspNetCore.Authorization;

namespace Learn.Custom;

public class CustomAuthorizationRequirement : IAuthorizationRequirement
{
    public string Name { get; set; }
}
