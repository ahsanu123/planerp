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
    public Task AddClaimsAsync(AppUser user, IList<Claim> claims);
    public Task RemoveClaimsAsync(AppUser user, IList<Claim> claims);
    public Task<IEnumerable<AppUser>> GetUserWithClaimAsync(Claim claim);
}

public class ClaimRepository : IClaimRepository
{
    private ISqliteConnectionProvider _conn;

    public ClaimRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    public async Task AddClaimsAsync(AppUser user, IList<Claim> claims)
    {
        var GetListClaims_Query = new Query(nameof(ClaimModel)).Where(
            FullNameof(nameof(ClaimModel.Id)),
            user.Id
        );

        using (var conn = _conn.CreateConnection())
        {
            var listClaims = await conn.QuerySqlKataAsync<ClaimModel>(GetListClaims_Query);
            foreach (var claim in listClaims)
            {
                Console.WriteLine($"Claim: {claim.ClaimValue}");
            }
        }
    }

    public async Task<IEnumerable<Claim>?> GetClaimsAsync(AppUser user)
    {
        var GetListClaims_Query = new Query(nameof(ClaimModel)).Where(
            FullNameof(nameof(ClaimModel.Id)),
            user.Id
        );

        using (var conn = _conn.CreateConnection())
        {
            var listClaims = await conn.QuerySqlKataAsync<ClaimModel>(GetListClaims_Query);
            var convertedClaims = new List<Claim>();

            foreach (var claim in listClaims)
            {
                convertedClaims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }
            return convertedClaims;
        }
    }

    public async Task<IEnumerable<AppUser>> GetUserWithClaimAsync(Claim claim)
    {
        var queryConstraint = new Dictionary<string, string>()
        {
            { nameof(ClaimModel.ClaimType), claim.Type },
            { nameof(ClaimModel.ClaimValue), claim.Value },
        };

        var GetUserWithClaim_Query = new Query(nameof(ClaimModel))
            .Where(queryConstraint)
            .Select(new[] { nameof(ClaimModel.Id) });

        using (var conn = _conn.CreateConnection())
        {
            var usersId = await conn.QuerySqlKataAsync<int>(GetUserWithClaim_Query);

            var GetUserWithId_Query = new Query(nameof(AppUserMigration)).Where(
                nameof(AppUserMigration.Id),
                "in",
                usersId
            );

            var users = await conn.QuerySqlKataAsync<AppUserMigration>(GetUserWithId_Query);
            return users as IEnumerable<AppUser>;
        }
    }

    public async Task RemoveClaimsAsync(AppUser user, IList<Claim> claims)
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
