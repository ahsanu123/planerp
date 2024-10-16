using Planerp.Model;
using Planerp.Repository;
using Planerp.Services;

namespace Planerp.BuilderService;

public static class ServiceCollectionCustom
{
    public static IServiceCollection AddServiceCollectionExtension(this IServiceCollection services)
    {
        services.AddSingleton<PostgresqlConnectionProvider>();
        services.AddSingleton<FileUtilService>();

        services.AddScoped<GenericRepository<Storage>>();
        services.AddScoped<GenericRepository<Project>>();
        services.AddScoped<GenericRepository<Component>>();
        services.AddScoped<GenericRepository<ResourceDoc>>();
        services.AddScoped<GenericRepository<ProducingStep>>();
        services.AddScoped<GenericRepository<LoggerModel>>();

        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IProjectPageRepository, ProjectPageRepository>();

        return services;
    }
}
