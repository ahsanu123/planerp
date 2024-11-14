using RabbitMQ.Client;

namespace Send.Service;

public interface IRabbitMQService
{
    public Task Send(byte[] body, string exchangeName, string routingKey);
    public Task<string> DeclareExcange(string exchangeName);
}

public class RabbitMQService : IRabbitMQService
{
    private IChannel _chann;

    public RabbitMQService(IChannel channel)
    {
        this._chann = channel;
    }

    public async Task<string> DeclareExcange(string exchangeName)
    {
        await this._chann.ExchangeDeclareAsync(exchange: exchangeName, type: ExchangeType.Direct);
        return exchangeName;
    }

    public async Task Send(byte[] body, string exchangeName, string routingKey)
    {
        await this._chann.BasicPublishAsync(
            exchange: exchangeName,
            routingKey: routingKey,
            body: body
        );
    }
}
