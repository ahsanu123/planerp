using Learn.Model;
using Learn.Repository;
using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public partial class UserStore : IUserStore<AppUser>
{
    private IUserRepository _userRepo;
    private IRoleRepository _roleRepo;
    private IUserClaimRepository _userClaimRepo;

    public UserStore(
        IUserRepository userRepo,
        IRoleRepository claimRepo,
        IUserClaimRepository userClaimRepository
    )
    {
        _userRepo = userRepo;
        _roleRepo = claimRepo;
        _userClaimRepo = userClaimRepository;
    }

    public void Dispose() { }

    // IUserStore
    public async Task<IdentityResult> CreateAsync(AppUser user, CancellationToken cancellationToken)
    {
        var success = await _userRepo.CreateUserAsync(user);
        if (success)
            return IdentityResult.Success;
        return IdentityResult.Failed();
    }

    public async Task<IdentityResult> DeleteAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _userRepo.DeleteUserAsync(user);
        return IdentityResult.Success;
    }

    public async Task<AppUser?> FindByIdAsync(string userId, CancellationToken cancellationToken)
    {
        var result = await _userRepo.FindByIdAsync(Int32.Parse(userId));
        return result;
    }

    public async Task<AppUser?> FindByNameAsync(
        string normalizedUserName,
        CancellationToken cancellationToken
    )
    {
        var result = await _userRepo.FindByNameAsync(normalizedUserName);
        return result;
    }

    public async Task<string?> GetNormalizedUserNameAsync(
        AppUser user,
        CancellationToken cancellationToken
    )
    {
        var result = await _userRepo.FindByIdAsync(user.Id);
        return result.NormalizedUserName;
    }

    public async Task<string> GetUserIdAsync(AppUser user, CancellationToken cancellationToken)
    {
        var result = await _userRepo.FindByIdAsync(user.Id);
        if (result == null)
            return user.Id.ToString();
        return null;
    }

    public async Task<string?> GetUserNameAsync(AppUser user, CancellationToken cancellationToken)
    {
        var result = await _userRepo.FindByIdAsync(user.Id);
        if (result == null)
            return user.UserName;
        return null;
    }

    public async Task SetNormalizedUserNameAsync(
        AppUser user,
        string? normalizedName,
        CancellationToken cancellationToken
    )
    {
        user.NormalizedUserName = normalizedName;
        await _userRepo.UpdateUserAsync(user);
    }

    public async Task SetUserNameAsync(
        AppUser user,
        string? userName,
        CancellationToken cancellationToken
    )
    {
        user.UserName = userName;
        await _userRepo.UpdateUserAsync(user);
    }

    public async Task<IdentityResult> UpdateAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _userRepo.UpdateUserAsync(user);
        return IdentityResult.Success;
    }
}
