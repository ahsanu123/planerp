using System.Globalization;
using System.Security.Claims;
using Learn.AppIdentity;
using Learn.Extension;
using Learn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.StandardIdentity;

/// <summary>
/// TODO:
/// Note -> Every Role Have Claims
/// </summary>
/// <typeparam name="TRole"></typeparam>
public class StandardRoleStore<TRole>
    : RoleStoreBase<TRole, int, IdentityUserRole<int>, IdentityRoleClaim<int>>
    where TRole : IdentityRole<int>
{
    public StandardRoleStore(
        ISqliteConnectionProvider sqliteConnection,
        IdentityErrorDescriber? describer = null
    )
        : base(describer ?? new IdentityErrorDescriber())
    {
        _conn = sqliteConnection;
    }

    private async Task CreateConnection(Func<SqliteConnection, Task> connection)
    {
        using (var conn = _conn.CreateConnection())
        {
            await connection(conn);
        }
    }

    private readonly ISqliteConnectionProvider _conn;

    public override IQueryable<TRole> Roles => throw new NotImplementedException();

    public override Task AddClaimAsync(
        TRole role,
        Claim claim,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }

    public override int ConvertIdFromString(string? id)
    {
        return base.ConvertIdFromString(id);
    }

    public override string? ConvertIdToString(int id)
    {
        return base.ConvertIdToString(id);
    }

    public override Task<IdentityResult> CreateAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }

    public override async Task<IdentityResult> DeleteAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        var DeleteRole_Query = new Query(nameof(IntIdentityRole))
            .Where(nameof(IntIdentityRole.Id), role.Id)
            .AsDelete();

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(DeleteRole_Query);
        });

        return IdentityResult.Success;
    }

    public override bool Equals(object? obj)
    {
        return base.Equals(obj);
    }

    public override async Task<TRole?> FindByIdAsync(
        string id,
        CancellationToken cancellationToken = default
    )
    {
        TRole? role = null;
        var GetRoleById_Query = new Query(nameof(IntIdentityRole)).Where(
            nameof(IntIdentityRole.Id),
            id
        );
        await CreateConnection(async conn =>
        {
            role =
                (await conn.QuerySingleSqlKataAsync<IntIdentityRole>(GetRoleById_Query)) as TRole;
        });
        return role;
    }

    public override async Task<TRole?> FindByNameAsync(
        string normalizedName,
        CancellationToken cancellationToken = default
    )
    {
        TRole? role = null;
        var GetRoleByNormalizedName_Query = new Query(nameof(IntIdentityRole)).Where(
            nameof(IntIdentityRole.NormalizedName),
            normalizedName
        );
        await CreateConnection(async conn =>
        {
            role =
                (await conn.QuerySingleSqlKataAsync<IntIdentityRole>(GetRoleByNormalizedName_Query))
                as TRole;
        });
        return role;
    }

    public override async Task<IList<Claim>> GetClaimsAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        var claims = new List<Claim>();
        var GetClaimsForRole_Query = new Query(nameof(IntIdentityRoleClaim)).Where(
            nameof(IntIdentityRoleClaim.RoleId),
            role.Id
        );

        await CreateConnection(async conn =>
        {
            claims = (await conn.QuerySqlKataAsync<IntIdentityRoleClaim>(GetClaimsForRole_Query))
                .Select(claim => claim.ToClaim())
                .ToList();
        });
        return claims;
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

    public override Task<string?> GetNormalizedRoleNameAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        return base.GetNormalizedRoleNameAsync(role, cancellationToken);
    }

    public override Task<string> GetRoleIdAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        return base.GetRoleIdAsync(role, cancellationToken);
    }

    public override Task<string?> GetRoleNameAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        return base.GetRoleNameAsync(role, cancellationToken);
    }

    public override Task RemoveClaimAsync(
        TRole role,
        Claim claim,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }

    public override Task SetNormalizedRoleNameAsync(
        TRole role,
        string? normalizedName,
        CancellationToken cancellationToken = default
    )
    {
        return base.SetNormalizedRoleNameAsync(role, normalizedName, cancellationToken);
    }

    public override Task SetRoleNameAsync(
        TRole role,
        string? roleName,
        CancellationToken cancellationToken = default
    )
    {
        return base.SetRoleNameAsync(role, roleName, cancellationToken);
    }

    public override string? ToString()
    {
        return base.ToString();
    }

    public override Task<IdentityResult> UpdateAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException();
    }

    protected override IdentityRoleClaim<int> CreateRoleClaim(TRole role, Claim claim)
    {
        return base.CreateRoleClaim(role, claim);
    }
}
