using System.Reflection;
using FluentMigrator;

namespace Planerp.PlanerpMigration;

[Migration(MigrationExtension.MIGRATION_VERSION, MigrationExtension.MIGRATION_DESCRIPTION)]
public class MainMigrator : Migration
{
    /// <summary>
    ///
    /// Scan All MigrationBase in assembly, and create instance of it
    /// then run childUp or childDown inside MainMigrator Up and Down Method
    ///
    /// </summary>
    IEnumerable<Type> listMigration = Assembly
        .GetAssembly(typeof(MigrationBase))
        .GetTypes()
        .Where(type =>
            type.IsClass && !type.IsAbstract && typeof(MigrationBase).IsAssignableFrom(type)
        );

    List<MigrationBase> GetMigrationInheritedClass()
    {
        List<MigrationBase> list = new List<MigrationBase>();
        foreach (var item in listMigration)
        {
            if (System.Attribute.GetCustomAttributes(item).Length == 0)
            {
                list.Add((MigrationBase)Activator.CreateInstance(item));
            }
        }
        return list;
    }

    public override void Down()
    {
        foreach (var item in GetMigrationInheritedClass())
        {
            item.MigrationDown(this);
        }
    }

    public override void Up()
    {
        if (!MigrationExtension.UpdateForeignKey)
        {
            foreach (var item in GetMigrationInheritedClass())
            {
                item.MigrationUp(this);
            }
        }

        if (MigrationExtension.UpdateForeignKey)
        {
            foreach (var item in GetMigrationInheritedClass())
            {
                item.GenerateForeignKey(this);
            }
        }
    }
}
