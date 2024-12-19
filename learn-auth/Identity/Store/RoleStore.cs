using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.AppIdentity;

public partial class RoleStore : IRoleStore<AppRole>
{
    public Task<IdentityResult> CreateAsync(AppRole role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<IdentityResult> DeleteAsync(AppRole role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public void Dispose() { }

    public Task<AppRole?> FindByIdAsync(string roleId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<AppRole?> FindByNameAsync(
        string normalizedRoleName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetNormalizedRoleNameAsync(
        AppRole role,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<string> GetRoleIdAsync(AppRole role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<string?> GetRoleNameAsync(AppRole role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task SetNormalizedRoleNameAsync(
        AppRole role,
        string? normalizedName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task SetRoleNameAsync(
        AppRole role,
        string? roleName,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }

    public Task<IdentityResult> UpdateAsync(AppRole role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}