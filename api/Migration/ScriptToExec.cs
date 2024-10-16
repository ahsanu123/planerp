using FluentMigrator;

namespace Planerp.PlanerpMigration;

public class ScriptToExec : MigrationBase
{
    // this base path belong to /api
    private readonly string DatabaseBasePath = Directory.GetCurrentDirectory() + "/Database";

    void MigrationBase.MigrationDown(Migration migration) { }

    void MigrationBase.MigrationUp(Migration migration)
    {
        // var listSQLFile = Directory.EnumerateFiles(this.DatabaseBasePath, "*.sql");
        // foreach (var sqlFile in listSQLFile)
        // {
        //     migration.Execute.Script(sqlFile);
        //     Console.WriteLine($"-- {sqlFile}");
        // }
    }
}
