namespace Planerp.Extensions;

using System.Data;
using Dapper;
using SqlKata;
using SqlKata.Compilers;

public static class DapperSqlKataExtension
{
    public static async Task<IEnumerable<T>> QuerySqlKataAsync<T>(
        this IDbConnection conn,
        Query query
    )
    {
        var compiler = new PostgresCompiler();
        var sqlResult = compiler.Compile(query);

        return await conn.QueryAsync<T>(sqlResult.Sql, sqlResult.NamedBindings);
    }
}
