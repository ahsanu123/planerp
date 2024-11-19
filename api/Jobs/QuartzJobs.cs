using Quartz;

namespace Planerp.Jobs;

public static class QuartzJobsCollection
{
    public static IServiceCollectionQuartzConfigurator AddJobCollection(
        this IServiceCollectionQuartzConfigurator jobs
    )
    {
        jobs.DefineJobsWithName<InsertComponentPriceToDbJob>(
            "autoInsertComponent",
            option => option.WithCronSchedule("0 * * ? * *")
        );
        return jobs;
    }

    public static IServiceCollectionQuartzConfigurator DefineJobsWithName<T>(
        this IServiceCollectionQuartzConfigurator jobs,
        string name,
        Action<ITriggerConfigurator> triggerOption
    )
        where T : IJob
    {
        var jobKey = new JobKey(name);

        jobs.AddJob<T>(option => option.WithIdentity(jobKey));
        jobs.AddTrigger(option =>
        {
            option.ForJob(jobKey).WithIdentity($"{jobKey}-trigger");
            triggerOption(option);
        });

        return jobs;
    }
}
