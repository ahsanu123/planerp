using FluentMigrator;

namespace Planerp.PlanerpMigration;

public class BillOfMateriaMigration : MigrationChild
{
    public void ChildDown(Migration migration)
    {
        migration.DeleteTableIfExists("bom");
    }

    public void ChildUp(Migration migration)
    {
        migration
            .Create.Table("bom")
            .WithColumn("id")
            .AsInt32()
            .PrimaryKey()
            .Identity()
            .WithColumn("notes")
            .AsString();
    }

    public void SetupForeignKey(Migration migration) { }
}
