using System.Globalization;
using System.Security.Claims;
using Learn.AppIdentity;
using Learn.Extension;
using Learn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using SqlKata;

namespace Learn.StandardIdentity;

/// <summary>
/// Class that Implement RoleStoreBase with TKey = int
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

    private async Task<IEnumerable<TRole>> ListRole()
    {
        var GetRoles_Query = new Query(nameof(IdentityRoleIntKey));

        IEnumerable<TRole>? roles = null;
        await CreateConnection(async conn =>
        {
            roles =
                (await conn.QuerySqlKataAsync<IdentityRoleIntKey>(GetRoles_Query))
                as IEnumerable<TRole>;
        });

        return roles;
    }

    public override IQueryable<TRole> Roles =>
        Task.Run(async () => await ListRole()).Result.AsQueryable();

    public override async Task AddClaimAsync(
        TRole role,
        Claim claim,
        CancellationToken cancellationToken = default
    )
    {
        var roleClaim = CreateRoleClaim(role, claim);

        var constraint = new Dictionary<string, string>
        {
            { nameof(IdentityRoleClaimIntKey.ClaimType), roleClaim.ClaimType },
            { nameof(IdentityRoleClaimIntKey.ClaimValue), roleClaim.ClaimValue },
            { nameof(IdentityRoleClaimIntKey.RoleId), role.Id.ToString() },
        };
        var CheckIfClaimAlreadyExists_Query = new Query(nameof(IdentityRoleClaimIntKey)).Where(
            constraint
        );

        await CreateConnection(async conn =>
        {
            var roleClaimInDb = await conn.QuerySingleSqlKataAsync<IdentityRoleClaimIntKey>(
                CheckIfClaimAlreadyExists_Query
            );
            if (roleClaimInDb == null)
            {
                await conn.InsertToDatabase(roleClaim, true, typeof(IdentityRoleClaimIntKey));
            }
        });
    }

    public override int ConvertIdFromString(string? id)
    {
        return base.ConvertIdFromString(id);
    }

    public override string? ConvertIdToString(int id)
    {
        return base.ConvertIdToString(id);
    }

    public override async Task<IdentityResult> CreateAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        TRole? roleInDb = null;

        var CheckIfRoleAlreadyExist_Query = new Query(nameof(IdentityRoleIntKey)).Where(
            nameof(IdentityRoleIntKey.NormalizedName),
            role.NormalizedName
        );
        await CreateConnection(async conn =>
        {
            roleInDb =
                (
                    await conn.QuerySingleSqlKataAsync<IdentityRoleIntKey>(
                        CheckIfRoleAlreadyExist_Query
                    )
                ) as TRole;
            if (roleInDb == null)
            {
                await conn.InsertToDatabase(role, true, typeof(IdentityRoleIntKey));
            }
        });

        return roleInDb == null ? IdentityResult.Success : IdentityResult.Failed();
    }

    public override async Task<IdentityResult> DeleteAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        var DeleteRole_Query = new Query(nameof(IdentityRoleIntKey))
            .Where(nameof(IdentityRoleIntKey.Id), role.Id)
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
        var GetRoleById_Query = new Query(nameof(IdentityRoleIntKey)).Where(
            nameof(IdentityRoleIntKey.Id),
            id
        );
        await CreateConnection(async conn =>
        {
            role =
                (await conn.QuerySingleSqlKataAsync<IdentityRoleIntKey>(GetRoleById_Query))
                as TRole;
        });
        return role;
    }

    public override async Task<TRole?> FindByNameAsync(
        string normalizedName,
        CancellationToken cancellationToken = default
    )
    {
        TRole? role = null;
        var GetRoleByNormalizedName_Query = new Query(nameof(IdentityRoleIntKey)).Where(
            nameof(IdentityRoleIntKey.NormalizedName),
            normalizedName
        );
        await CreateConnection(async conn =>
        {
            role =
                (
                    await conn.QuerySingleSqlKataAsync<IdentityRoleIntKey>(
                        GetRoleByNormalizedName_Query
                    )
                ) as TRole;
        });
        return role;
    }

    public override async Task<IList<Claim>> GetClaimsAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        var claims = new List<Claim>();
        var GetClaimsForRole_Query = new Query(nameof(IdentityRoleClaimIntKey)).Where(
            nameof(IdentityRoleClaimIntKey.RoleId),
            role.Id
        );

        await CreateConnection(async conn =>
        {
            claims = (await conn.QuerySqlKataAsync<IdentityRoleClaimIntKey>(GetClaimsForRole_Query))
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

    public override async Task RemoveClaimAsync(
        TRole role,
        Claim claim,
        CancellationToken cancellationToken = default
    )
    {
        var roleClaim = CreateRoleClaim(role, claim);

        var constraint = new Dictionary<string, string>
        {
            { nameof(IdentityRoleClaimIntKey.RoleId), roleClaim.RoleId.ToString() },
            { nameof(IdentityRoleClaimIntKey.ClaimValue), roleClaim.ClaimValue },
            { nameof(IdentityRoleClaimIntKey.ClaimType), roleClaim.ClaimType },
        };
        var RemoveClaim_Query = new Query(nameof(IdentityRoleClaimIntKey))
            .Where(constraint)
            .AsDelete();

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(RemoveClaim_Query);
        });
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

    public override async Task<IdentityResult> UpdateAsync(
        TRole role,
        CancellationToken cancellationToken = default
    )
    {
        var UpdateRole_Query = new Query(nameof(IdentityRoleIntKey))
            .Where(nameof(IdentityRoleIntKey.Id), role.Id)
            .AsUpdate(role);

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(UpdateRole_Query);
        });

        return IdentityResult.Success;
    }

    protected override IdentityRoleClaim<int> CreateRoleClaim(TRole role, Claim claim)
    {
        return base.CreateRoleClaim(role, claim);
    }
}
