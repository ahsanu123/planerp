using Microsoft.AspNetCore.Authorization;

namespace Learn.AppAuthorization;

public static class CustomAuthorizationExtension
{
    public static AuthorizationOptions AddCustomPolicies(this AuthorizationOptions option)
    {
        option.AddPolicy(
            "SuperAdmin",
            policy =>
            {
                policy.AddRequirements(new SuperAdminAuthorizationRequirement());
            }
        );
        return option;
    }
}
