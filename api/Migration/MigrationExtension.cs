using FluentMigrator;
using FluentMigrator.Runner;

namespace Planerp.PlanerpMigration;

public interface MigrationBase
{
    public abstract void MigrationUp(Migration migration);
    public abstract void MigrationDown(Migration migration);
}

public static class MigrationExtension
{
    public const int MIGRATION_VERSION = 34;
    public const string MIGRATION_DESCRIPTION = $"Add Migration Message Here";

    public static IApplicationBuilder Migrate(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var runner = scope.ServiceProvider.GetService<IMigrationRunner>();
        var versionLoader = scope.ServiceProvider.GetService<IVersionLoader>();

        runner.ListMigrations();

        if (MigrationExtension.MIGRATION_VERSION > versionLoader.VersionInfo.Latest())
        {
            runner.Down(new MainMigrator());
            runner.MigrateUp(MigrationExtension.MIGRATION_VERSION);
        }

        return app;
    }

    public static Migration DeleteTableIfExists(this Migration migration, string name)
    {
        if (migration.Schema.Table(name).Exists())
            migration.Delete.Table(name);

        return migration;
    }
}
