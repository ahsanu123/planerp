using Microsoft.Extensions.Hosting;
using Send.Extension;
using Send.Model;

namespace Send.Service;

public class ConsoleWatcher : IHostedService
{
    private string exchangeName = "console_watcher";

    public ConsoleWatcher(IRabbitMQService rabbit)
    {
        this._bunny = rabbit;
        this._bunny.DeclareExcange(exchangeName);
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        Task.Run(() =>
        {
            Console.Clear();
            Console.CancelKeyPress += new ConsoleCancelEventHandler(this._controlCHandler);
            while (this._run)
            {
                Console.Write("Enter Message: ");
                var message = Console.ReadLine();
                Console.WriteLine($"Sending Message: {message}\n");
                this.send(message);
            }
        });
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("\nTerminating Console Watcher Service");
        return Task.CompletedTask;
    }

    private void send(string message)
    {
        _bunny.Send(message.GetBytes(), exchangeName, "watcher_key");
    }

    private void _controlCHandler(object sender, ConsoleCancelEventArgs args)
    {
        this._run = false;
    }

    private bool _run { get; set; } = true;

    private IRabbitMQService _bunny { get; set; }
}
