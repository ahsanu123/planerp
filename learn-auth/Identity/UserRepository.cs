using Dapper;
using Learn.Extension;
using Microsoft.Data.Sqlite;
using Newtonsoft.Json;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.AppIdentity;

public interface IUserRepository
{
    public Task<bool> CreateUserAsync(AppUser newUser);
    public Task DeleteUserAsync(AppUser user);
    public Task UpdateUserAsync(AppUser user);
    public Task<AppUser?> FindByIdAsync(int id);
    public Task<AppUser?> FindByNameAsync(string normalizedUserName);
    public Task<object> GetAll();
}

public class UserRepository : IUserRepository
{
    private ISqliteConnectionProvider _conn;

    private async Task<bool> CheckIfUserExist(SqliteConnection conn, AppUser user)
    {
        var CheckIfUserExist_Query = new Query(nameof(AppUser)).Where(
            FullNameof(nameof(AppUser.Id)),
            user.Id
        );
        var appUser = await conn.QuerySingleSqlKataAsync<AppUser>(CheckIfUserExist_Query);
        return appUser != null;
    }

    public UserRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    public async Task<bool> CreateUserAsync(AppUser newUser)
    {
        var FindByNormalizedName_Query = new Query(nameof(AppUser)).Where(
            FullNameof(nameof(AppUser.NormalizedUserName)),
            newUser.NormalizedUserName
        );
        using (var conn = _conn.CreateConnection())
        {
            var nameAlreadyExist = await conn.QuerySingleSqlKataAsync<AppUser>(
                FindByNormalizedName_Query
            );

            if (nameAlreadyExist == null)
            {
                var result = await conn.InsertToDatabase(newUser, true);
                return true;
            }
            return false;
        }
    }

    public async Task DeleteUserAsync(AppUser user)
    {
        var DeleteUser_Query = new Query(nameof(AppUser))
            .Where(FullNameof(nameof(AppUser.Id)), user.Id)
            .AsDelete();

        using (var conn = _conn.CreateConnection())
        {
            if (await CheckIfUserExist(conn, user))
            {
                await conn.ExecuteSqlKataAsync(DeleteUser_Query);
            }
        }
    }

    public async Task UpdateUserAsync(AppUser user)
    {
        using (var conn = _conn.CreateConnection())
        {
            if (await CheckIfUserExist(conn, user))
            {
                await conn.InsertToDatabase(user, true);
            }
        }
    }

    public async Task<object> GetAll()
    {
        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.QueryAsync<object>("select * from AppUser;");
            return result;
        }
    }

    public async Task<AppUser?> FindByIdAsync(int id)
    {
        var FindById_Query = new Query(nameof(AppUser)).Where(FullNameof(nameof(AppUser.Id)), id);
        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.QuerySingleSqlKataAsync<AppUser>(FindById_Query);
            return result;
        }
    }

    public async Task<AppUser?> FindByNameAsync(string normalizedUserName)
    {
        var FindByNormalizedName_Query = new Query(nameof(AppUser)).Where(
            FullNameof(nameof(AppUser.NormalizedUserName)),
            normalizedUserName
        );

        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.QuerySingleSqlKataAsync<AppUser>(FindByNormalizedName_Query);
            return result;
        }
    }
}
