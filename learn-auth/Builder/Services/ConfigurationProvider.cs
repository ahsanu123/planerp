using Learn.Model;

namespace Learn.Services;

public static class AppSettingConfigurationProvider
{
    public static IServiceCollection AddConfigurationProvider(
        this IServiceCollection services,
        IConfigurationRoot configuration
    )
    {
        services.Configure<ConnectionStrings>(configuration.GetSection(nameof(ConnectionStrings)));
        return services;
    }
}
