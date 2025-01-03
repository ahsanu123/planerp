using AMS.AppAuthorization;
using AMS.AppIdentity;
using AMS.Repository;
using Microsoft.AspNetCore.Authorization;

namespace AMS.Services;

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
