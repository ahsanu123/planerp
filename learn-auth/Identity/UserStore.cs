using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public class UserStore : IUserStore<AppUser>
{
    private IUserRepository _userRepo;

    public UserStore(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<IdentityResult> CreateAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _userRepo.CreateUser(user);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _userRepo.DeleteUser(user);
        return IdentityResult.Success;
    }

    public void Dispose()
    {
        throw new NotImplementedException();
    }

    public Task<AppUser?> FindByIdAsync(string userId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<AppUser?> FindByNameAsync(
        string normalizedUserName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetNormalizedUserNameAsync(
        AppUser user,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<string> GetUserIdAsync(AppUser user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetUserNameAsync(AppUser user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task SetNormalizedUserNameAsync(
        AppUser user,
        string? normalizedName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task SetUserNameAsync(
        AppUser user,
        string? userName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public async Task<IdentityResult> UpdateAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _userRepo.UpdateUser(user);
        return IdentityResult.Success;
    }
}
