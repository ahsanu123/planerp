using Learn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Learn.StandardIdentity;

/// <summary>
/// TODO:
/// Create static function that register all service
/// to activate user store and user role class
/// </summary>
public static class StandardUserStoreExtensionBuilder
{
    /// <summary>
    /// a Static Function To Add Custom Store For IdentityUser with TKey = int
    /// </summary>
    /// <param name="IdentityBuilder"></param>
    /// <returns></returns>
    public static IdentityBuilder AddStandardCustomIdentityStores(this IdentityBuilder builder)
    {
        builder.Services.AddScoped<
            IUserStore<IdentityUserIntKey>,
            StandardUserStore<IdentityUserIntKey, IdentityRoleIntKey>
        >();
        builder.Services.AddScoped<
            IRoleStore<IdentityRoleIntKey>,
            StandardRoleStore<IdentityRoleIntKey>
        >();
        return builder;
    }
}
