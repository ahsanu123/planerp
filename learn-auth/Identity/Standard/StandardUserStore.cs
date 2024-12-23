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

public class StandardUserStore<TUser, TRole>
    : UserStoreBase<
        TUser,
        TRole,
        int,
        IdentityUserClaim<int>,
        IdentityUserRole<int>,
        IdentityUserLogin<int>,
        IdentityUserToken<int>,
        IdentityRoleClaim<int>
    >,
        IUserStore<TUser>
    where TUser : IdentityUser<int>
    where TRole : IdentityRole<int>
{
    private async Task CreateConnection(Func<SqliteConnection, Task> connection)
    {
        using (var conn = _conn.CreateConnection())
        {
            await connection(conn);
        }
    }

    private readonly ISqliteConnectionProvider _conn;

    public override IQueryable<TUser> Users => throw new NotImplementedException();

    public StandardUserStore(
        ISqliteConnectionProvider sqliteConnectionProvider,
        IdentityErrorDescriber describer
    )
        : base(describer)
    {
        _conn = sqliteConnectionProvider;
    }

    public override async Task<IdentityResult> CreateAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        await CreateConnection(async conn =>
        {
            await conn.InsertToDatabase<IntIdentityUser>(user as IntIdentityUser);
        });

        return IdentityResult.Success;
    }

    public override async Task<IdentityResult> DeleteAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        var result = IdentityResult.Failed();

        var CheckIfUserExist_Query = new Query(nameof(IntIdentityUser)).Where(
            FullNameof(nameof(IntIdentityUser.Id)),
            user.Id
        );
        var DeleteUser_Query = new Query(nameof(IntIdentityUser))
            .Where(FullNameof(nameof(IntIdentityUser.Id)), user.Id)
            .AsDelete();

        await CreateConnection(async conn =>
        {
            var userExists = await conn.QuerySingleSqlKataAsync<IntIdentityUser>(
                CheckIfUserExist_Query
            );
            if (userExists != null)
            {
                await conn.ExecuteSqlKataAsync(DeleteUser_Query);
                result = IdentityResult.Success;
            }
        });

        return result;
    }

    public override async Task<TUser?> FindByEmailAsync(
        string normalizedEmail,
        CancellationToken cancellationToken = default
    )
    {
        TUser? user = null;
        var FindByEmail_Query = new Query(nameof(IntIdentityUser)).Where(
            nameof(IntIdentityUser.NormalizedEmail),
            normalizedEmail
        );

        await CreateConnection(async conn =>
        {
            user =
                (await conn.QuerySingleSqlKataAsync<IntIdentityUser>(FindByEmail_Query)) as TUser;
        });
        return user;
    }

    public override async Task<TUser?> FindByIdAsync(
        string userId,
        CancellationToken cancellationToken = default
    )
    {
        TUser? user = null;
        var FindById_Query = new Query(nameof(IntIdentityUser)).Where(
            nameof(IntIdentityUser.Id),
            userId
        );

        await CreateConnection(async conn =>
        {
            user = (await conn.QuerySingleSqlKataAsync<IntIdentityUser>(FindById_Query)) as TUser;
        });
        return user;
    }

    public override async Task<TUser?> FindByNameAsync(
        string normalizedUserName,
        CancellationToken cancellationToken = default
    )
    {
        TUser? user = null;
        var FindById_Query = new Query(nameof(IntIdentityUser)).Where(
            nameof(IntIdentityUser.NormalizedUserName),
            normalizedUserName
        );

        await CreateConnection(async conn =>
        {
            user = (await conn.QuerySingleSqlKataAsync<IntIdentityUser>(FindById_Query)) as TUser;
        });
        return user;
    }

    // Claim
    public override async Task<IList<Claim>> GetClaimsAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        var GetClaimsByUserId_Query = new Query(nameof(IntIdentityUserClaim)).Where(
            nameof(IntIdentityUserClaim.UserId),
            user.Id
        );

        var listClaims = new List<Claim>();
        await CreateConnection(async conn =>
        {
            var claims = await conn.QuerySqlKataAsync<IntIdentityUserClaim>(
                GetClaimsByUserId_Query
            );
            listClaims = claims.Select(claim => claim.ToClaim()).ToList();
        });

        return listClaims;
    }

    public override async Task AddClaimsAsync(
        TUser user,
        IEnumerable<Claim> claims,
        CancellationToken cancellationToken = default
    )
    {
        var CheckIfClaimExist_Query = new Query(nameof(IntIdentityUserClaim));

        await CreateConnection(async conn =>
        {
            foreach (var claim in claims)
            {
                var userClaim = CreateUserClaim(user, claim);
                var claimExist = await conn.QuerySingleSqlKataAsync<IntIdentityUserClaim>(
                    CheckIfClaimExist_Query
                        .Where(nameof(IntIdentityUserClaim.ClaimType), userClaim.ClaimType)
                        .Where(nameof(IntIdentityUserClaim.UserId), user.Id)
                );

                if (claimExist == null)
                {
                    await conn.InsertToDatabase(userClaim);
                }
            }
        });
    }

    public override async Task ReplaceClaimAsync(
        TUser user,
        Claim claim,
        Claim newClaim,
        CancellationToken cancellationToken = default
    )
    {
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserClaim.ClaimType), newClaim.Type },
            { nameof(IntIdentityUserClaim.UserId), user.Id.ToString() },
        };

        var IsClaimExist_Query = new Query(nameof(IntIdentityUserClaim)).Where(constraint);

        await CreateConnection(async conn =>
        {
            var claimInDb = await conn.QuerySingleSqlKataAsync<IntIdentityUserClaim>(
                IsClaimExist_Query
            );
            if (claimInDb != null)
            {
                await conn.UpdateByCondition(
                    CreateUserClaim(user, newClaim),
                    query =>
                    {
                        query.Where(constraint);
                    },
                    false,
                    typeof(IntIdentityUserClaim)
                );
            }
        });
    }

    public override async Task RemoveClaimsAsync(
        TUser user,
        IEnumerable<Claim> claims,
        CancellationToken cancellationToken = default
    )
    {
        var RemoveClaim_Query = new Query(nameof(IntIdentityUserClaim))
            .Where(nameof(IntIdentityUserClaim.UserId), user.Id)
            .WhereIn(nameof(IntIdentityUserClaim.ClaimType), claims.Select(claim => claim.Type));

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(RemoveClaim_Query);
        });
    }

    // UserLogin
    public override async Task AddLoginAsync(
        TUser user,
        UserLoginInfo login,
        CancellationToken cancellationToken = default
    )
    {
        var CheckIfUserLoginExists_Query = new Query(nameof(IntIdentityUserLogin)).Where(
            nameof(IntIdentityUserLogin.UserId),
            user.Id
        );
        await CreateConnection(async conn =>
        {
            var userLoginExists = await conn.QuerySingleSqlKataAsync<IntIdentityUserLogin>(
                CheckIfUserLoginExists_Query
            );
            if (userLoginExists == null)
            {
                await conn.InsertToDatabase(CreateUserLogin(user, login));
            }
        });
    }

    public override async Task RemoveLoginAsync(
        TUser user,
        string loginProvider,
        string providerKey,
        CancellationToken cancellationToken = default
    )
    {
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserLogin.UserId), user.Id.ToString() },
            { nameof(IntIdentityUserLogin.LoginProvider), loginProvider },
            { nameof(IntIdentityUserLogin.ProviderKey), providerKey },
        };

        var DeleteUserLogin_Query = new Query(nameof(IntIdentityUserLogin))
            .Where(constraint)
            .AsDelete();

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(DeleteUserLogin_Query);
        });
    }

    public override async Task<IList<UserLoginInfo>> GetLoginsAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        var GetLoginForUser_Query = new Query(nameof(IntIdentityUserLogin)).Where(
            nameof(IntIdentityUserLogin.UserId),
            user.Id
        );
        var listUserLoginInfo = new List<UserLoginInfo>();

        await CreateConnection(async conn =>
        {
            listUserLoginInfo = (
                await conn.QuerySqlKataAsync<IntIdentityUserLogin>(GetLoginForUser_Query)
            )
                .Select(loginInfo => new UserLoginInfo(
                    loginInfo.LoginProvider,
                    loginInfo.ProviderKey,
                    loginInfo.ProviderDisplayName
                ))
                .ToList();
        });
        return listUserLoginInfo;
    }

    protected override async Task<IdentityUserLogin<int>?> FindUserLoginAsync(
        int userId,
        string loginProvider,
        string providerKey,
        CancellationToken cancellationToken
    )
    {
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserLogin.LoginProvider), loginProvider },
            { nameof(IntIdentityUserLogin.ProviderKey), providerKey },
            { nameof(IntIdentityUserLogin.UserId), userId.ToString() },
        };
        var GetUserLogin_Query = new Query(nameof(IntIdentityUserLogin)).Where(constraint);

        IdentityUserLogin<int>? userLogin = null;

        await CreateConnection(async conn =>
        {
            userLogin =
                (await conn.QuerySingleSqlKataAsync<IntIdentityUserLogin>(GetUserLogin_Query))
                as IdentityUserLogin<int>;
        });

        return userLogin;
    }

    protected override async Task<IdentityUserLogin<int>?> FindUserLoginAsync(
        string loginProvider,
        string providerKey,
        CancellationToken cancellationToken
    )
    {
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserLogin.LoginProvider), loginProvider },
            { nameof(IntIdentityUserLogin.ProviderKey), providerKey },
        };
        var GetUserLogin_Query = new Query(nameof(IntIdentityUserLogin)).Where(constraint);

        IdentityUserLogin<int>? userLogin = null;

        await CreateConnection(async conn =>
        {
            userLogin =
                (await conn.QuerySingleSqlKataAsync<IntIdentityUserLogin>(GetUserLogin_Query))
                as IdentityUserLogin<int>;
        });

        return userLogin;
    }

    // Role

    public override async Task AddToRoleAsync(
        TUser user,
        string normalizedRoleName,
        CancellationToken cancellationToken = default
    )
    {
        var GetUserRole_Query = new Query(nameof(IntIdentityRole)).Where(
            nameof(IdentityRole.NormalizedName),
            normalizedRoleName
        );

        await CreateConnection(async conn =>
        {
            var roleEntity = await conn.QuerySingleSqlKataAsync<TRole>(GetUserRole_Query);
            if (roleEntity == null)
            {
                throw new InvalidOperationException(
                    string.Format(
                        CultureInfo.CurrentCulture,
                        "NormalizedName Not Found",
                        normalizedRoleName
                    )
                );
            }

            await conn.InsertToDatabase(CreateUserRole(user, roleEntity));
        });
    }

    public override async Task RemoveFromRoleAsync(
        TUser user,
        string normalizedRoleName,
        CancellationToken cancellationToken = default
    )
    {
        var GetRoleForNormalizedRoleName_Query = new Query(nameof(IntIdentityRole)).Where(
            nameof(IntIdentityRole.NormalizedName),
            normalizedRoleName
        );

        await CreateConnection(async conn =>
        {
            var role = await conn.QuerySingleSqlKataAsync<IntIdentityRole>(
                GetRoleForNormalizedRoleName_Query
            );
            if (role != null)
            {
                var IsRoleExistForUser_Query = new Query(nameof(IntIdentityUserRole))
                    .Where(nameof(IntIdentityUserRole.UserId), user.Id)
                    .Where(nameof(IntIdentityUserRole.RoleId), role.Id);

                var userRole = await conn.QuerySingleSqlKataAsync<IntIdentityUserRole>(
                    IsRoleExistForUser_Query
                );

                if (userRole != null)
                {
                    await conn.ExecuteSqlKataAsync(IsRoleExistForUser_Query.AsDelete());
                }
            }
        });
    }

    public override async Task<IList<string>> GetRolesAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        var roles = new List<string>();
        var GetRolesForUser_Query = new Query(nameof(IntIdentityRole))
            .Join(
                nameof(IntIdentityUserRole),
                FullNameof(nameof(IntIdentityUserRole.RoleId)),
                FullNameof(nameof(IntIdentityRole.Id))
            )
            .Where(FullNameof(nameof(IntIdentityUserRole.UserId)), user.Id)
            .SelectAllClassProperties(typeof(IntIdentityRole));

        await CreateConnection(async conn =>
        {
            roles = (await conn.QuerySqlKataAsync<IntIdentityRole>(GetRolesForUser_Query))
                .Select(role => role.NormalizedName)
                .ToList();
        });
        return roles;
    }

    public override async Task<bool> IsInRoleAsync(
        TUser user,
        string normalizedRoleName,
        CancellationToken cancellationToken = default
    )
    {
        bool userInRole = false;

        var GetRolesForUser_Query = new Query(nameof(IntIdentityRole))
            .Join(
                nameof(IntIdentityUserRole),
                FullNameof(nameof(IntIdentityUserRole.RoleId)),
                FullNameof(nameof(IntIdentityRole.Id))
            )
            .Where(FullNameof(nameof(IntIdentityUserRole.UserId)), user.Id)
            .SelectAllClassProperties(typeof(IntIdentityUserRole));

        await CreateConnection(async conn =>
        {
            var userRole = await conn.QuerySqlKataAsync<IntIdentityRole>(GetRolesForUser_Query);
            userInRole = userRole != null ? true : false;
        });

        return userInRole;
    }

    public override async Task<IList<TUser>> GetUsersForClaimAsync(
        Claim claim,
        CancellationToken cancellationToken = default
    )
    {
        var users = new List<IntIdentityUser>();
        var constraint = new Dictionary<string, string>
        {
            { FullNameof(nameof(IntIdentityUserClaim.ClaimType)), claim.Type },
            { FullNameof(nameof(IntIdentityUserClaim.ClaimValue)), claim.Value },
        };
        var GetUserForClaim_Query = new Query(nameof(IntIdentityUser))
            .Join(
                nameof(IntIdentityUserClaim),
                FullNameof(nameof(IntIdentityUserClaim.UserId)),
                FullNameof(nameof(IntIdentityUser.Id))
            )
            .Where(constraint)
            .SelectAllClassProperties(typeof(IntIdentityUser));

        await CreateConnection(async conn =>
        {
            users = (await conn.QuerySqlKataAsync<IntIdentityUser>(GetUserForClaim_Query)).ToList();
        });

        return users as List<TUser>;
    }

    public override async Task<IList<TUser>> GetUsersInRoleAsync(
        string normalizedRoleName,
        CancellationToken cancellationToken = default
    )
    {
        var users = new List<IntIdentityUser>();
        var GetUserInRole_Query = new Query(nameof(IntIdentityUser))
            .Join(
                nameof(IntIdentityUserRole),
                FullNameof(nameof(IntIdentityUserRole.UserId)),
                FullNameof(nameof(IntIdentityUser.Id))
            )
            .Join(
                nameof(IntIdentityRole),
                FullNameof(nameof(IntIdentityUserRole.RoleId)),
                FullNameof(nameof(IntIdentityRole.Id))
            )
            .Where(FullNameof(nameof(IntIdentityRole.NormalizedName), normalizedRoleName))
            .SelectAllClassProperties(typeof(IntIdentityUser));

        await CreateConnection(async conn =>
        {
            users = (await conn.QuerySqlKataAsync<IntIdentityUser>(GetUserInRole_Query)).ToList();
        });

        return users as List<TUser>;
    }

    public override async Task<IdentityResult> UpdateAsync(
        TUser user,
        CancellationToken cancellationToken = default
    )
    {
        await CreateConnection(async conn =>
        {
            await conn.UpdateByCondition(
                user,
                query =>
                {
                    query.Where(nameof(IntIdentityUser.Id), user.Id);
                },
                false,
                typeof(IntIdentityUser)
            );
        });
        return IdentityResult.Success;
    }

    protected override async Task AddUserTokenAsync(IdentityUserToken<int> token)
    {
        await CreateConnection(async conn =>
        {
            await conn.InsertToDatabase(token, false, typeof(IntIdentityUserToken));
        });
    }

    protected override async Task<TRole?> FindRoleAsync(
        string normalizedRoleName,
        CancellationToken cancellationToken
    )
    {
        TRole? role = null;
        var FindRole_Query = new Query(nameof(IntIdentityRole)).Where(
            nameof(IntIdentityRole.NormalizedName),
            normalizedRoleName
        );
        await CreateConnection(async conn =>
        {
            role = (await conn.QuerySingleSqlKataAsync<IntIdentityRole>(FindRole_Query)) as TRole;
        });
        return role;
    }

    protected override async Task<IdentityUserToken<int>?> FindTokenAsync(
        TUser user,
        string loginProvider,
        string name,
        CancellationToken cancellationToken
    )
    {
        IntIdentityUserToken? userToken = null;
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserToken.UserId), user.Id.ToString() },
            { nameof(IntIdentityUserToken.LoginProvider), loginProvider },
            { nameof(IntIdentityUserToken.Name), name },
        };
        var FindToken_Query = new Query(nameof(IntIdentityUserToken)).Where(constraint);

        await CreateConnection(async conn =>
        {
            userToken = await conn.QuerySingleSqlKataAsync<IntIdentityUserToken>(FindToken_Query);
        });

        return userToken;
    }

    protected override async Task<TUser?> FindUserAsync(
        int userId,
        CancellationToken cancellationToken
    )
    {
        TUser? user = null;
        var FindUser_Query = new Query(nameof(IntIdentityUser)).Where(
            nameof(IntIdentityUser.Id),
            userId
        );

        await CreateConnection(async conn =>
        {
            user = (await conn.QuerySingleSqlKataAsync<IntIdentityUser>(FindUser_Query)) as TUser;
        });
        return user;
    }

    protected override async Task<IdentityUserRole<int>?> FindUserRoleAsync(
        int userId,
        int roleId,
        CancellationToken cancellationToken
    )
    {
        IdentityUserRole<int>? role = null;
        var constraint = new Dictionary<string, string>
        {
            { nameof(IntIdentityUserRole.UserId), userId.ToString() },
            { nameof(IntIdentityUserRole.RoleId), roleId.ToString() },
        };
        var FindUserRole_Query = new Query(nameof(IntIdentityUserRole)).Where(constraint);

        await CreateConnection(async conn =>
        {
            role =
                (await conn.QuerySingleSqlKataAsync<IntIdentityUserRole>(FindUserRole_Query))
                as IdentityUserRole<int>;
        });
        return role;
    }

    protected override async Task RemoveUserTokenAsync(IdentityUserToken<int> token)
    {
        var RemoveUserToken_Query = new Query(nameof(IntIdentityUserToken)).Where(token);

        await CreateConnection(async conn =>
        {
            await conn.ExecuteSqlKataAsync(RemoveUserToken_Query);
        });
    }
}
