using Learn.AppIdentity;

namespace Learn.Services;

public static class ServiceCollections
{
    public static IServiceCollection AddServicesCollection(this IServiceCollection services)
    {
        services.AddSingleton<ISqliteConnectionProvider, SqliteConnectionProvider>();

        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}
