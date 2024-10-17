using FluentMigrator;
using Planerp.Model;

namespace Planerp.PlanerpMigration;

public class ModelMigrationList : MigrationBase
{
    public void MigrationDown(Migration migration)
    {
        migration
            .DeleteTableIfExistsCascadePostgresql(nameof(LoggerModel))
            .DeleteTableIfExistsCascadePostgresql(nameof(ProducingStep))
            .DeleteTableIfExistsCascadePostgresql(nameof(Project))
            .DeleteTableIfExistsCascadePostgresql(nameof(ResourceDoc))
            .DeleteTableIfExistsCascadePostgresql(nameof(Storage))
            .DeleteTableIfExistsCascadePostgresql(nameof(Component));
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

    public void GenerateForeignKey(Migration migration)
    {
        migration
            .GenerateForeignKey(new LoggerModel())
            .GenerateForeignKey(new ProducingStep())
            .GenerateForeignKey(new Project())
            .GenerateForeignKey(new ResourceDoc())
            .GenerateForeignKey(new Storage())
            .GenerateForeignKey(new Component());
    }
}
