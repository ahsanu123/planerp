using FluentMigrator;
using Planerp.Model;

namespace Planerp.PlanerpMigration;

public class ModelMigrationList : MigrationBase
{
    public void MigrationDown(Migration migration)
    {
        migration
            .DeleteTableIfExists(nameof(Component))
            .DeleteTableIfExists(nameof(LoggerModel))
            .DeleteTableIfExists(nameof(ProducingStep))
            .DeleteTableIfExists(nameof(Project))
            .DeleteTableIfExists(nameof(ResourceDoc))
            .DeleteTableIfExists(nameof(Storage));
    }

    public void MigrationUp(Migration migration)
    {
        migration
            .ConvertModelToMigration(new LoggerModel())
            .ConvertModelToMigration(new ProducingStep())
            .ConvertModelToMigration(new Project())
            .ConvertModelToMigration(new ResourceDoc())
            .ConvertModelToMigration(new Storage())
            .ConvertModelToMigration(new Component());
    }

    public void SetupForeignKey(Migration migration) { }
}
