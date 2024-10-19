namespace Planerp.Extensions;

using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using Dapper;
using Newtonsoft.Json;
using SqlKata;
using SqlKata.Compilers;

public class DapperSqlKataExtensionHelper
{
    public static void LogRaw(SqlResult sqlResult)
    {
        UtilityExtension.ShowCurrentPosition(sqlResult.Sql);
        UtilityExtension.ShowCurrentPosition(JsonConvert.SerializeObject(sqlResult.NamedBindings));
    }

    public static SqlResult CompilePostgresqlQuery(Query query)
    {
        var compiler = new PostgresCompiler();
        var sqlResult = compiler.Compile(query);

        return sqlResult;
    }
}

public static class DapperSqlKataExtension
{
    public static async Task<IDbConnection> InsertToDatabase<T>(this IDbConnection conn, T value)
    {
        var className = typeof(T).Name;
        var InsertIntoDatabase_QUERY = new Query(className).AsInsert(value);

        await conn.ExecuteSqlKataAsync(InsertIntoDatabase_QUERY, true);
        return conn;
    }

    /*
     * <summary>
     * Add Id to Database Array
     * used model need to have primaryId, and newInsertedId
     * </summary>
     * */
    public static async Task AddIdToDatabaseArray<T>(IDbConnection conn, T value)
    {
        var className = typeof(T).Name;

        var DataBaseList_Query = new Query(className);
        var CheckIfInsertedValueAlredyExist_Query = DataBaseList_Query
            .Clone()
            .SelectAllClassProperties(typeof(T))
            .Where(value);

        var InsertNewValueToDatabase_Query = DataBaseList_Query.Clone().AsInsert(value);

        var isInsertedValuAlreadyExist = await conn.QuerySingleSqlKataAsync<T>(
            CheckIfInsertedValueAlredyExist_Query,
            true
        );

        if (isInsertedValuAlreadyExist == null)
        {
            await conn.ExecuteSqlKataAsync(InsertNewValueToDatabase_Query, true);
        }
    }

    public static async Task<T> QuerySingleSqlKataAsync<T>(
        this IDbConnection conn,
        Query query,
        bool LogRaw = false
    )
    {
        var sqlResult = DapperSqlKataExtensionHelper.CompilePostgresqlQuery(query);

        if (LogRaw)
        {
            UtilityExtension.ShowCurrentPosition(sqlResult.Sql);
        }

        var result = await conn.QueryAsync<T>(sqlResult.Sql, sqlResult.NamedBindings);
        return result.ToList().FirstOrDefault();
    }

    public static async Task ExecuteSqlKataAsync(
        this IDbConnection conn,
        Query query,
        bool logRaw = false
    )
    {
        var sqlResult = DapperSqlKataExtensionHelper.CompilePostgresqlQuery(query);

        DapperSqlKataExtensionHelper.LogRaw(sqlResult);

        await conn.ExecuteAsync(sqlResult.Sql, sqlResult.NamedBindings);
    }

    public static async Task<IEnumerable<T>> QuerySqlKataAsync<T>(
        this IDbConnection conn,
        Query query,
        bool LogRaw = false
    )
    {
        var sqlResult = DapperSqlKataExtensionHelper.CompilePostgresqlQuery(query);

        DapperSqlKataExtensionHelper.LogRaw(sqlResult);

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
