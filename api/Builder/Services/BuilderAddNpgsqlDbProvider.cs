using Microsoft.EntityFrameworkCore;
using Planerp.PlanerpMigration;

namespace Planerp.BuilderService;

public static class NpgSqlDbProvider
{
    public static IServiceCollection AddPostgresqlDbProvider(
        this IServiceCollection services,
        string connectionString
    )
    {
        services.AddDbContext<MasterContext>(option =>
        {
            option.UseNpgsql(connectionString);
            option.EnableSensitiveDataLogging();
            option.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        });
        return services;
    }
}
