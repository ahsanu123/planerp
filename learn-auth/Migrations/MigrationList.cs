using FluentMigrator;
using Learn.Model;

namespace Learn.InternalMigration;

public class ModelMigrationList : MigrationBase
{
    private List<Type> listModel = new List<Type> { typeof(Component), typeof(User) };

    public void MigrationDown(Migration migration)
    {
        this.listModel.ForEach((type) => migration.DeleteTableIfExists(type));
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
