using Learn.AppAuthorization;
using Learn.AppIdentity;
using Learn.Model;
using Learn.Repository;
using Learn.StandardIdentity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Learn.Services;

public static class ServiceCollections
{
    public static IServiceCollection AddServicesCollection(this IServiceCollection services)
    {
        services.AddSingleton<ISqliteConnectionProvider, SqliteConnectionProvider>();

        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IRoleRepository, RoleRepository>();
        services.AddTransient<IUserClaimRepository, UserClaimRepository>();
        services.AddTransient<ICampaignRepository, CampaignRepository>();

        services.AddSingleton<IAuthorizationHandler, SuperAdminAuthorizationHandler>();

        services.AddSingleton<IEmailSender<IdentityUserIntKey>, ConsoleEmailSender>();

        return services;
    }
}
