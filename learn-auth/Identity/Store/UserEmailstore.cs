using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public partial class UserStore : IUserEmailStore<AppUser>
{
    public Task<AppUser?> FindByEmailAsync(
        string normalizedEmail,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetEmailAsync(AppUser user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<bool> GetEmailConfirmedAsync(AppUser user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetNormalizedEmailAsync(AppUser user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task SetEmailAsync(AppUser user, string? email, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task SetEmailConfirmedAsync(
        AppUser user,
        bool confirmed,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task SetNormalizedEmailAsync(
        AppUser user,
        string? normalizedEmail,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }
}
