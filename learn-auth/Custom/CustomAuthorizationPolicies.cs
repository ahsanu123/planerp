using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Learn.Custom;

public class CustomAuthorizationPolicies
{
    public static void AddPolicies(AuthorizationOptions options)
    {
        var listCustomRequirement = new IAuthorizationRequirement[]
        {
            new RolesAuthorizationRequirement(new[] { "User", "Administrator" }),
            new AssertionRequirement(context => !string.Equals(context.User.Identity.Name, "bob")),
        };
        var authPolicy = new AuthorizationPolicy(
            listCustomRequirement,
            new[] { CookieAuthenticationDefaults.AuthenticationScheme }
        );

        // options.FallbackPolicy = authPolicy;
    }
}
