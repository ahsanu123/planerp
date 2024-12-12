using Dapper;
using Learn.Extension;
using Microsoft.Data.Sqlite;
using Newtonsoft.Json;
using SqlKata;
using static Learn.Extension.UtilityExtension;

namespace Learn.AppIdentity;

public interface IUserRepository
{
    public Task CreateUser(AppUser newUser);
    public Task DeleteUser(AppUser user);
    public Task UpdateUser(AppUser user);
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

    public async Task CreateUser(AppUser newUser)
    {
        using (var conn = _conn.CreateConnection())
        {
            var result = await conn.InsertToDatabase(newUser, true);
        }
    }

    public async Task DeleteUser(AppUser user)
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

    public async Task UpdateUser(AppUser user)
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
}
