using Learn.Constant;
using Microsoft.AspNetCore.Authorization;

namespace Learn.AppAuthorization;

public class SuperAdminAuthorizationRequirement : IAuthorizationRequirement
{
    public SuperAdminAuthorizationRequirement()
    {
        Email = Environment.GetEnvironmentVariable(AuthorizationConstant.SuperAdminEmail);
    }

    public string? Email { get; set; }
}
