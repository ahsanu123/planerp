using System.Security.Claims;
using Learn.AppIdentity;
using Learn.Extension;
using Learn.Model;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.Repository;

public interface IRoleRepository
{
    public Task<IEnumerable<Claim>> GetClaimsAsync(AppUser user);
    public Task AddClaimsAsync(AppUser user, string roleName);
    public Task RemoveFromRoleAsync(AppUser user, string roleName);
    public Task<IEnumerable<AppUser>> GetUserWithClaimAsync(string roleName);
    public Task<bool> IsUserInRoleAsync(AppUser user, string roleName);
}

public class RoleRepository : IRoleRepository
{
    private ISqliteConnectionProvider _conn;

    public RoleRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    public async Task AddClaimsAsync(AppUser user, string roleName)
    {
        // Pseudo code
        // 1. check if rolename already added for user
        // 2. if not add rolename to user

        var normalizedRoleName = roleName.ToUpper();
        var constraint = new Dictionary<string, string>
        {
            { FullNameof(nameof(ClaimModel.AppUserId)), user.Id.ToString() },
            { FullNameof(nameof(ClaimModel.ClaimValue)), normalizedRoleName },
        };

        var CheckIfRoleAlreadyAssignedForUserQuery = new Query(nameof(ClaimModel)).Where(
            constraint
        );

        using (var conn = _conn.CreateConnection())
        {
            var result = conn.QuerySingleSqlKataAsync<ClaimModel>(
                CheckIfRoleAlreadyAssignedForUserQuery
            );
            if (result == null)
            {
                var newClaimModel = new ClaimModel
                {
                    AppUserId = user.Id,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = normalizedRoleName,
                };
                await conn.InsertToDatabase(newClaimModel);
            }
        }
    }

    public async Task<IEnumerable<Claim>?> GetClaimsAsync(AppUser user)
    {
        var GetListClaimsByUserIdQuery = new Query(nameof(ClaimModel)).Where(
            FullNameof(nameof(ClaimModel.AppUserId)),
            user.Id
        );

        using (var conn = _conn.CreateConnection())
        {
            var listClaims = await conn.QuerySqlKataAsync<ClaimModel>(GetListClaimsByUserIdQuery);

            var claims = listClaims.Select(item => new Claim(item.ClaimType, item.ClaimValue));
            return claims;
        }
    }

    public async Task<IEnumerable<AppUser>> GetUserWithClaimAsync(string roleName)
    {
        var GetAllUserWithRoleName_Query = new Query(nameof(ClaimModel))
            .LeftJoin(
                nameof(AppUser),
                FullNameof(nameof(AppUser.Id)),
                FullNameof(nameof(ClaimModel.AppUserId))
            )
            .Where(FullNameof(nameof(ClaimModel.ClaimValue)), roleName)
            .SelectAllClassProperties(new[] { typeof(AppUser) });

        IEnumerable<AppUser> listUser;
        using (var conn = _conn.CreateConnection())
        {
            listUser = await conn.QuerySqlKataAsync<AppUser>(GetAllUserWithRoleName_Query);
        }

        foreach (var user in listUser)
        {
            var userClaims = await GetClaimsAsync(user);
            user.Claims = userClaims.ToList();
        }
        return listUser as IEnumerable<AppUser>;
    }

    public async Task<bool> IsUserInRoleAsync(AppUser user, string roleName)
    {
        var constraint = new Dictionary<string, string>
        {
            { nameof(ClaimModel.AppUserId), user.Id.ToString() },
            { nameof(ClaimModel.ClaimValue), roleName.ToUpper() },
        };
        var IsUserInRole_Query = new Query(nameof(ClaimModel)).Where(constraint);

        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.QuerySingleSqlKataAsync<ClaimModel>(IsUserInRole_Query);
            return result != null ? true : false;
        }

        return true;
    }

    public async Task RemoveFromRoleAsync(AppUser user, string roleName)
    {
        var listConstraint = new Dictionary<string, string>()
        {
            { nameof(ClaimModel.AppUserId), user.Id.ToString() },
            { nameof(ClaimModel.ClaimValue), roleName.ToUpper() },
        };

        using (var conn = _conn.CreateConnection())
        {
            var RemoveClaims_Query = new Query(nameof(ClaimModel)).Where(listConstraint).AsDelete();

            await conn.ExecuteSqlKataAsync(RemoveClaims_Query);
        }
    }
}
