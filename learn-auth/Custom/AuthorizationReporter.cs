using System.Security.Claims;
using Learn.UserClaim;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace Learn.Custom;

public class AuthorizationReporter
{
    private string[] schemes = new string[] { "TestScheme" };

    private RequestDelegate next;
    private IAuthorizationPolicyProvider policyProvider;
    private IAuthorizationService authorizationService;

    public AuthorizationReporter(
        RequestDelegate requestDelegate,
        IAuthorizationPolicyProvider authPolicyProvider,
        IAuthorizationService serviceProvider
    )
    {
        next = requestDelegate;
        policyProvider = authPolicyProvider;
        authorizationService = serviceProvider;
    }

    public async Task Invoke(HttpContext context)
    {
        var endPoint = context.GetEndpoint();

        if (endPoint != null)
        {
            var results = new Dictionary<(string, string), bool>();

            var allowAnonymous = endPoint.Metadata.GetMetadata<IAllowAnonymous>() != null;
            var authData =
                endPoint.Metadata.GetOrderedMetadata<IAuthorizeData>()
                ?? Array.Empty<IAuthorizeData>();

            var policy = await AuthorizationPolicy.CombineAsync(policyProvider, authData);

            foreach (var claimPrincipal in GetUsers())
            {
                var userKey = claimPrincipal.Identity.Name ?? "(No User)";
                var authTypeKey = claimPrincipal.Identity.AuthenticationType;
                var canAccess =
                    allowAnonymous || policy == null || await AuthorizeUser(claimPrincipal, policy);

                results[(userKey, authTypeKey)] = canAccess;
            }
            context.Items["authReport"] = results;
            await endPoint.RequestDelegate(context);
        }
        else
            await next(context);
    }

    private IEnumerable<ClaimsPrincipal> GetUsers()
    {
        var users = UsersAndClaims.GetUsers();
        return UsersAndClaims
            .GetUsers()
            .Concat(new[] { new ClaimsPrincipal(new ClaimsIdentity()) });
    }

    private async Task<bool> AuthorizeUser(
        ClaimsPrincipal claimsPrincipal,
        AuthorizationPolicy policy
    )
    {
        var authSucceeded = (
            await authorizationService.AuthorizeAsync(claimsPrincipal, policy)
        ).Succeeded;

        return UserSchemeMatchesPolicySchemes(claimsPrincipal, policy) && authSucceeded;
    }

    private bool UserSchemeMatchesPolicySchemes(
        ClaimsPrincipal claimPrincipal,
        AuthorizationPolicy policy
    )
    {
        var policyEmpty = policy.AuthenticationSchemes?.Count() == 0;

        var identityWithAuthType = claimPrincipal.Identities.Select(id => id.AuthenticationType);

        var identityWithContainedScheme = identityWithAuthType.Any(authName =>
            policy.AuthenticationSchemes.Any(scheme => scheme == authName)
        );

        return policyEmpty || identityWithContainedScheme;
    }
}
