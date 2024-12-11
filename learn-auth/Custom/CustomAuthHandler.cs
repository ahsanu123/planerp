using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace Learn.Custom;

public class CustomAuthHandler : IAuthenticationSignInHandler
{
    private HttpContext? context;
    private AuthenticationScheme? scheme;

    public Task<AuthenticateResult> AuthenticateAsync()
    {
        AuthenticateResult result;
        string user = context.Request.Cookies["authUser"];

        if (user != null)
        {
            var claim = new Claim(ClaimTypes.Name, user);
            var identity = new ClaimsIdentity(scheme.Name);
            identity.AddClaim(claim);

            var principal = new ClaimsPrincipal(identity);
            var authTicket = new AuthenticationTicket(principal, scheme.Name);

            result = AuthenticateResult.Success(authTicket);
        }
        else
            result = AuthenticateResult.NoResult();

        return Task.FromResult(result);
    }

    public Task ChallengeAsync(AuthenticationProperties? properties)
    {
        return Task.CompletedTask;
    }

    public Task ForbidAsync(AuthenticationProperties? properties)
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    }

    public Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)
    {
        this.context = context;
        this.scheme = scheme;
        return Task.CompletedTask;
    }

    public Task SignInAsync(ClaimsPrincipal user, AuthenticationProperties? properties)
    {
        context.Response.Cookies.Append("authUser", user.Identity.Name);
        return Task.CompletedTask;
    }

    public Task SignOutAsync(AuthenticationProperties? properties)
    {
        context.Response.Cookies.Delete("authUser");
        return Task.CompletedTask;
    }
}
