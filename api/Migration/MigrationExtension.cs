using FluentMigrator;
using FluentMigrator.Runner;

namespace Planerp.PlanerpMigration;

public interface MigrationBase
{
    public abstract void MigrationUp(Migration migration);
    public abstract void MigrationDown(Migration migration);
    public abstract void GenerateForeignKey(Migration migration);
}

public static class MigrationExtension
{
    public const int MIGRATION_VERSION = 45;
    public const string MIGRATION_DESCRIPTION = $"Add Migration Message Here";
    public static bool UpdateForeignKey = false;

    public static IApplicationBuilder Migrate(this IApplicationBuilder builder)
    {
        using var scope = builder.ApplicationServices.CreateScope();
        var runner = scope.ServiceProvider.GetService<IMigrationRunner>();
        var versionLoader = scope.ServiceProvider.GetService<IVersionLoader>();

        runner.ListMigrations();

        if (MigrationExtension.MIGRATION_VERSION > versionLoader.VersionInfo.Latest())
        {
            runner.Down(new MainMigrator());

            runner.MigrateUp(MigrationExtension.MIGRATION_VERSION);
            MigrationExtension.UpdateForeignKey = true;
            runner.Up(new MainMigrator());
        }

        return builder;
    }

    public static Migration DeleteTableIfExists(this Migration migration, string name)
    {
        migration.Delete.Table(name).IfExists();

        return migration;
    }

    public static Migration DeleteTableIfExistsCascadePostgresql(
        this Migration migration,
        string tableName
    )
    {
        var postgresqlDeleteCascade = $"DROP TABLE IF EXISTS \"{tableName}\" CASCADE;";
        migration.Execute.Sql(postgresqlDeleteCascade);
        return migration;
    }
}
