using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.Services;

public static class DefaultRolesBuilder
{
    public static async Task<IApplicationBuilder> AddDefaultRoles(this IApplicationBuilder builder)
    {
        using var scope = builder.ApplicationServices.CreateScope();

        var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRoleIntKey>>();

        var DefaultRoles = new List<string>()
        {
            "Baker",
            "Administrator",
            "Seller",
            "Waitress",
            "GeneralAdmin",
            "EuropeAdmin",
            "AsiaAdmin",
            "AmericanAdmin",
            "AustralianAdmin",
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
