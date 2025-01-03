using AMS.AppIdentity;
using AMS.Model;
using FluentMigrator;
using Microsoft.AspNetCore.Identity;

namespace AMS.InternalMigration;

public class ModelMigrationList : MigrationBase
{
    private List<Type> listModel = new List<Type>
    {
        typeof(IdentityRoleIntKey),
        typeof(IdentityUserIntKey),
        typeof(IdentityRoleClaimIntKey),
        typeof(IdentityUserClaimIntKey),
        typeof(IdentityUserLoginIntKey),
        typeof(IdentityUserRoleIntKey),
        typeof(IdentityUserTokenIntKey),
        typeof(CampaignModel),
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
