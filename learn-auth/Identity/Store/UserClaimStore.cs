using System.Security.Claims;
using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public partial class UserStore : IUserClaimStore<AppUser>
{
    public Task AddClaimsAsync(
        AppUser user,
        IEnumerable<Claim> claims,
        CancellationToken cancellationToken
    )
    {
        return _userClaimRepo.AddClaimsAsync(user, claims);
    }

    public Task<IList<Claim>> GetClaimsAsync(AppUser user, CancellationToken cancellationToken)
    {
        return _userClaimRepo.GetClaimsAsync(user);
    }

    public Task<IList<AppUser>> GetUsersForClaimAsync(
        Claim claim,
        CancellationToken cancellationToken
    )
    {
        return _userClaimRepo.GetUsersForClaimAsync(claim);
    }

    public Task RemoveClaimsAsync(
        AppUser user,
        IEnumerable<Claim> claims,
        CancellationToken cancellationToken
    )
    {
        return _userClaimRepo.RemoveClaimsAsync(user, claims);
    }

    public Task ReplaceClaimAsync(
        AppUser user,
        Claim claim,
        Claim newClaim,
        CancellationToken cancellationToken
    )
    {
        return _userClaimRepo.ReplaceClaimAsync(user, claim, newClaim);
    }
}
