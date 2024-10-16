using FluentMigrator;
using Planerp.Model;

namespace Planerp.PlanerpMigration;

public class ModelMigrationList : MigrationBase
{
    private List<Type> listModel = new List<Type>
    {
        typeof(LoggerModel),
        typeof(ProducingStep),
        typeof(Project),
        typeof(ResourceDoc),
        typeof(Storage),
        typeof(Component),
        typeof(ProjectComponentList),
    };

    public void MigrationDown(Migration migration)
    {
        this.listModel.ForEach((type) => migration.DeleteTableIfExistsCascadePostgresql(type));
    }

    public void MigrationUp(Migration migration)
    {
        this.listModel.ForEach((type) => migration.ConvertModelToMigration(type));
    }

    public void GenerateForeignKey(Migration migration)
    {
        this.listModel.ForEach((type) => migration.GenerateForeignKey(type));
    }
}
