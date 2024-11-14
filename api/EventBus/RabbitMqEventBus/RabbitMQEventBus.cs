using RabbitMQ.Client;

namespace Planerp.EventBus;

public class RabbitMQEventBus : IHostedService, IDisposable, IEventBus
{
    private IConnection _rabbitMQConn;

    public void Dispose()
    {
        throw new NotImplementedException();
    }

    public Task PublishAsync(IntegrationEvent @event)
    {
        throw new NotImplementedException();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        Task.Factory.StartNew(() =>
        {
            try { }
            catch { }
        });
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
