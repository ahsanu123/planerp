using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public partial class UserStore : IUserRoleStore<AppUser>
{
    public async Task AddToRoleAsync(
        AppUser user,
        string roleName,
        CancellationToken cancellationToken
    )
    {
        await _claimRepo.AddClaimsAsync(user, roleName);
    }

    public async Task<IList<string>> GetRolesAsync(
        AppUser user,
        CancellationToken cancellationToken
    )
    {
        var claims = await _claimRepo.GetClaimsAsync(user);
        return claims.Select(claim => claim.Value).ToList();
    }

    public async Task<IList<AppUser>> GetUsersInRoleAsync(
        string roleName,
        CancellationToken cancellationToken
    )
    {
        var listUser = await _claimRepo.GetUserWithClaimAsync(roleName);
        return listUser.ToList();
    }

    public async Task<bool> IsInRoleAsync(
        AppUser user,
        string roleName,
        CancellationToken cancellationToken
    )
    {
        return await _claimRepo.IsUserInRoleAsync(user, roleName);
    }

    public async Task RemoveFromRoleAsync(
        AppUser user,
        string roleName,
        CancellationToken cancellationToken
    )
    {
        await _claimRepo.RemoveFromRoleAsync(user, roleName);
    }
}
