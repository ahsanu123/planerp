using AMS.Constant;
using AMS.Model;
using Microsoft.AspNetCore.Identity;

namespace AMS.Services;

public static class DefaultRolesBuilder
{
    public static async Task<IApplicationBuilder> AddDefaultRoles(this IApplicationBuilder builder)
    {
        using var scope = builder.ApplicationServices.CreateScope();

        var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRoleIntKey>>();

        var DefaultRoles = new List<string>()
        {
            nameof(RoleConstant.LocalSuperAdmin),
            nameof(RoleConstant.Buyer),
            nameof(RoleConstant.Manager),
        };

        foreach (var role in DefaultRoles)
        {
            var roleEntity = new IdentityRoleIntKey() { Name = role };

            var isExist = await roleManager.FindByNameAsync(role);
            if (isExist == null)
                await roleManager.CreateAsync(roleEntity);
        }

        return builder;
    }
}
