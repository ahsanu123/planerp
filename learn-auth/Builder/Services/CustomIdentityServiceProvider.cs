using Learn.AppIdentity;
using Learn.Model;
using Microsoft.AspNetCore.Identity;

namespace Learn.Services;

public static class CustomIdentityServiceProvider
{
    public static IServiceCollection AddCustomIdentityServiceCollection(
        this IServiceCollection services
    )
    {
        services.AddSingleton<IUserStore<AppUser>, UserStore>();
        services.AddSingleton<IPasswordHasher<AppUser>, SimplePasswordHasher>();

        return services;
    }
}
