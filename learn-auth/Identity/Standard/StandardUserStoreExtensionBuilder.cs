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
    public static IdentityBuilder AddStandardCustomIdentityStores(this IdentityBuilder builder)
    {
        builder.Services.AddScoped<
            IUserStore<IntIdentityUser>,
            StandardUserStore<IntIdentityUser, IntIdentityRole>
        >();
        builder.Services.AddScoped<
            IRoleStore<IntIdentityRole>,
            StandardRoleStore<IntIdentityRole>
        >();
        // builder.Services.TryAddScoped(
        //     typeof(IUserStore<>).MakeGenericType(builder.UserType),
        //     builder.UserType
        // );
        //
        // if (builder.RoleType != null)
        // {
        //     builder.Services.TryAddScoped(
        //         typeof(IRoleStore<>).MakeGenericType(builder.RoleType),
        //         builder.RoleType
        //     );
        // }
        //
        return builder;
    }
}
