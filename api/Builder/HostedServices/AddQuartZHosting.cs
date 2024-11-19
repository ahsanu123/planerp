using Planerp.Jobs;
using Quartz;

namespace Planerp.Hosting;

public static class AddQuartzHostingExtension
{
    public static IServiceCollection AddQuartzHosting(this IServiceCollection services)
    {
        services.AddQuartz(config =>
        {
            config.AddJobCollection();
        });

        services.AddQuartzHostedService(option =>
        {
            option.WaitForJobsToComplete = true;
        });

        return services;
    }
}
