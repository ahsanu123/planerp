using Microsoft.AspNetCore.Authentication;

namespace Learn.Custom;

public class CustomExternalAuthHandler : IAuthenticationHandler
{
    public AuthenticationScheme _scheme { get; set; }
    public HttpContext _context { get; set; }

    public Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)
    {
        _context = context;
        _scheme = scheme;
        return Task.CompletedTask;
    }

    public Task<AuthenticateResult> AuthenticateAsync()
    {
        return Task.FromResult(AuthenticateResult.NoResult());
    }

    public Task ChallengeAsync(AuthenticationProperties? properties)
    {
        return Task.CompletedTask;
    }

    public Task ForbidAsync(AuthenticationProperties? properties)
    {
        return Task.CompletedTask;
    }
}
