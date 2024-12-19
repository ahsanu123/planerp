using FluentMigrator;
using Learn.AppIdentity;
using Learn.Model;

namespace Learn.InternalMigration;

public class ModelMigrationList : MigrationBase
{
    private List<Type> listModel = new List<Type>
    {
        typeof(User),
        typeof(ClaimModel),
        typeof(AppUser),
    };

    public static List<string> listExcludedType = new List<string> { nameof(System.Collections) };

    public void MigrationDown(Migration migration)
    {
        this.listModel.ForEach((type) => migration.DeleteTableIfExists(type));
    }

    public void MigrationUp(Migration migration)
    {
        this.listModel.ForEach((type) => migration.ConvertModelToMigration(type, listExcludedType));
    }

    public void GenerateForeignKey(Migration migration)
    {
        this.listModel.ForEach((type) => migration.GenerateForeignKey(type));
    }
}
