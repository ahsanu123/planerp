namespace Planerp.Extensions;

using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using Dapper;
using Newtonsoft.Json;
using SqlKata;
using SqlKata.Compilers;

public static class DapperSqlKataExtension
{
    public static async Task<T> QuerySingleSqlKataAsync<T>(
        this IDbConnection conn,
        Query query,
        bool LogRaw = false
    )
    {
        var compiler = new PostgresCompiler();
        var sqlResult = compiler.Compile(query);

        if (LogRaw)
        {
            UtilityExtension.ShowCurrentPosition(sqlResult.Sql);
        }

        var result = await conn.QueryAsync<T>(sqlResult.Sql, sqlResult.NamedBindings);
        return result.ToList().FirstOrDefault();
    }

    public static async Task<IEnumerable<T>> QuerySqlKataAsync<T>(
        this IDbConnection conn,
        Query query,
        bool LogRaw = false
    )
    {
        var compiler = new PostgresCompiler();
        var sqlResult = compiler.Compile(query);

        if (LogRaw)
        {
            UtilityExtension.ShowCurrentPosition(sqlResult.Sql);
            UtilityExtension.ShowCurrentPosition(
                JsonConvert.SerializeObject(sqlResult.NamedBindings)
            );
        }

        return await conn.QueryAsync<T>(sqlResult.Sql, sqlResult.NamedBindings);
    }

    public static Query SelectAllClassProperties(
        this Query query,
        Type classType,
        bool printLog = false
    )
    {
        var columnlists = new List<string>();
        var className = classType.Name;

        var instance = Activator.CreateInstance(classType);

        foreach (var classProperty in instance.GetType().GetProperties())
        {
            columnlists.Add($"{className}.{classProperty.Name}");
        }

        if (printLog)
        {
            UtilityExtension.ShowCurrentPosition(
                JsonConvert.SerializeObject(columnlists, Formatting.Indented)
            );
        }

        query.Select(columnlists);
        return query;
    }

    public static Query WithAutoAlias(
        this Query query,
        Query queryToRun,
        [CallerArgumentExpression(nameof(queryToRun))] string callerParameter = ""
    )
    {
        query.With(callerParameter, queryToRun);
        return query;
    }
}
