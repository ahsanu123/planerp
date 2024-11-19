using Quartz;

namespace Planerp.Jobs;

public class HelloWorldJob : IJob
{
    public Task Execute(IJobExecutionContext context)
    {
        // Code that sends a periodic email to the user (for example)
        // Note: This method must always return a value
        // This is especially important for trigger listeners watching job execution

        Console.WriteLine("Hello world");
        return Task.CompletedTask;
    }
}
