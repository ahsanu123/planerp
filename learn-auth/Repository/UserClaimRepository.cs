using System.Security.Claims;
using Dapper;
using Learn.AppIdentity;
using Learn.Extension;
using Learn.Model;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.Repository;

public interface IUserClaimRepository
{
    public Task AddClaimsAsync(AppUser user, IEnumerable<Claim> claims);
    public Task<IList<Claim>> GetClaimsAsync(AppUser user);
    public Task RemoveClaimsAsync(AppUser user, IEnumerable<Claim> claims);
    public Task ReplaceClaimAsync(AppUser user, Claim claim, Claim newClaim);
    public Task<IList<AppUser>> GetUsersForClaimAsync(Claim claim);
}

public class UserClaimRepository : IUserClaimRepository
{
    private readonly ISqliteConnectionProvider _conn;

    private Query GetClaimByUserId_Query(AppUser user)
    {
        return new Query(nameof(ClaimModel)).Where(nameof(ClaimModel.AppUserId), user.Id);
    }

    public UserClaimRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    public async Task AddClaimsAsync(AppUser user, IEnumerable<Claim> claims)
    {
        using (var conn = _conn.CreateConnection())
        {
            var listClaims = await conn.QuerySqlKataAsync<ClaimModel>(GetClaimByUserId_Query(user));

            foreach (var claim in claims)
            {
                var exists = listClaims.Any(dbClaim => dbClaim.ClaimType == claim.Type);
                if (!exists)
                    await conn.InsertToDatabase(
                        new ClaimModel
                        {
                            AppUserId = user.Id,
                            ClaimType = claim.Type,
                            ClaimValue = claim.Value,
                        }
                    );
            }
        }
    }

    public async Task<IList<Claim>> GetClaimsAsync(AppUser user)
    {
        using (var conn = _conn.CreateConnection())
        {
            var listClaimsModel = await conn.QuerySqlKataAsync<ClaimModel>(
                GetClaimByUserId_Query(user)
            );
            var claims = listClaimsModel.Select(claimModel =>
            {
                return new Claim(claimModel.ClaimType, claimModel.ClaimValue);
            });

            return claims.ToList();
        }
    }

    public async Task RemoveClaimsAsync(AppUser user, IEnumerable<Claim> claims)
    {
        var listClaims = claims.Select(claim => claim.Type);
        var RemoveClaimForUser_Query = new Query(nameof(ClaimModel))
            .Where(nameof(ClaimModel.AppUserId), user.Id)
            .Where(nameof(ClaimModel.ClaimType), "IN", $"({String.Join(",", listClaims)})");

        using (var conn = _conn.CreateConnection())
        {
            await conn.ExecuteSqlKataAsync(RemoveClaimForUser_Query);
        }
    }

    public async Task ReplaceClaimAsync(AppUser user, Claim claim, Claim newClaim)
    {
        using (var conn = _conn.CreateConnection())
        {
            var newClaimModel = new ClaimModel()
            {
                AppUserId = user.Id,
                ClaimType = newClaim.Type,
                ClaimValue = newClaim.Value,
            };
            await conn.UpdateByCondition(
                newClaimModel,
                query =>
                {
                    query
                        .Where(nameof(ClaimModel.AppUserId), user.Id)
                        .Where(nameof(ClaimModel.ClaimType), claim.Type);
                },
                true
            );
        }
    }

    public async Task<IList<AppUser>> GetUsersForClaimAsync(Claim claim)
    {
        var GetUsersForClaim_Query = new Query(nameof(ClaimModel))
            .Join(
                nameof(AppUser),
                FullNameof(nameof(AppUser.Id)),
                FullNameof(nameof(ClaimModel.AppUserId))
            )
            .SelectAllClassProperties(new[] { typeof(AppUser) });

        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.QuerySqlKataAsync<AppUser>(GetUsersForClaim_Query);
            return result.ToList();
        }
    }
}
