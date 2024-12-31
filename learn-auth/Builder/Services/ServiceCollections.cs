using Learn.AppAuthorization;
using Learn.AppIdentity;
using Learn.Repository;
using Microsoft.AspNetCore.Authorization;

namespace Learn.Services;

public static class ServiceCollections
{
    public static IServiceCollection AddServicesCollection(this IServiceCollection services)
    {
        services.AddSingleton<ISqliteConnectionProvider, SqliteConnectionProvider>();
        services.AddSingleton<IAuthorizationHandler, SuperAdminAuthorizationHandler>();

        services.AddTransient<ICampaignRepository, CampaignRepository>();

        return services;
    }
}
