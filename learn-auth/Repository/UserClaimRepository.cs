using System.Security.Claims;
using Learn.AppIdentity;
using Learn.Extension;
using Learn.Model;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.Repository;

public interface IClaimRepository
{
    public Task<IEnumerable<Claim>> GetClaimsAsync(AppUser user);
    public Task AddClaimsAsync(AppUser user, string roleName);
    public Task RemoveClaimsAsync(AppUser user, IEnumerable<Claim> claims);
    public Task<IEnumerable<AppUser>> GetUserWithClaimAsync(string roleName);
}

public class ClaimRepository : IClaimRepository
{
    private ISqliteConnectionProvider _conn;

    public ClaimRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    public async Task AddClaimsAsync(AppUser user, string roleName)
    {
        // Pseudo code
        // 1. check if string role name already exist for user
        // 2. if not exists add role name into user

        var normalizedRoleName = roleName.ToUpper();
        var constraint = new Dictionary<string, string>
        {
            { FullNameof(nameof(ClaimModel.Id)), user.Id.ToString() },
            { FullNameof(nameof(ClaimModel.ClaimValue)), normalizedRoleName },
        };

        var CheckIfRoleAlreadyAssignedForUser_Query = new Query(nameof(ClaimModel)).Where(
            constraint
        );

        using (var conn = _conn.CreateConnection())
        {
            var result = conn.QuerySingleSqlKataAsync<ClaimModel>(
                CheckIfRoleAlreadyAssignedForUser_Query
            );
            if (result == null)
            {
                var newClaimModel = new ClaimModel
                {
                    Id = user.Id,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = normalizedRoleName,
                };
                await conn.InsertToDatabase(newClaimModel);
            }
        }
    }

    public async Task<IEnumerable<Claim>?> GetClaimsAsync(AppUser user)
    {
        var GetListClaimsByUserId_Query = new Query(nameof(ClaimModel)).Where(
            FullNameof(nameof(ClaimModel.Id)),
            user.Id
        );

        using (var conn = _conn.CreateConnection())
        {
            var listClaims = await conn.QuerySqlKataAsync<ClaimModel>(GetListClaimsByUserId_Query);
            var convertedClaims = new List<Claim>();

            foreach (var claim in listClaims)
            {
                convertedClaims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }
            return convertedClaims;
        }
    }

    public async Task<IEnumerable<AppUser>> GetUserWithClaimAsync(string roleName)
    {
        // pseudo code
        // 1.
        // 2.


        var GetAllUserIdForRoleName_Query = new Query(nameof(ClaimModel)).Where(
            FullNameof(nameof(Claim.Value)),
            roleName
        );

        using (var conn = _conn.CreateConnection())
        {
            var listUserId = (
                await conn.QuerySqlKataAsync<ClaimModel>(GetAllUserIdForRoleName_Query)
            ).Select(claimModel => claimModel.Id);

            var GetAllUserForId_Query = new Query(nameof(AppUser)).Where(
                FullNameof(nameof(AppUser.Id)),
                "in",
                String.Join(",", listUserId)
            );

            var listUser = await conn.QuerySqlKataAsync<AppUser>(GetAllUserForId_Query);

            return listUser as IEnumerable<AppUser>;
        }
    }

    public async Task RemoveClaimsAsync(AppUser user, IEnumerable<Claim> claims)
    {
        var listConstraint = new Dictionary<string, string>();

        using (var conn = _conn.CreateConnection())
        {
            foreach (var claim in claims)
            {
                listConstraint.Add(nameof(ClaimModel.ClaimValue), claim.Value);
                listConstraint.Add(nameof(ClaimModel.ClaimType), claim.Type);
            }
            var RemoveClaims_Query = new Query(nameof(ClaimModel)).Where(listConstraint).AsDelete();

            await conn.ExecuteSqlKataAsync(RemoveClaims_Query);
        }
    }
}
