using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var factory = new ConnectionFactory { HostName = "localhost", Password = "123" };
using var connection = await factory.CreateConnectionAsync();
using var channel = await connection.CreateChannelAsync();

string exchangeName = "console_watcher";
string routingKey = "watcher_key";

await channel.ExchangeDeclareAsync(exchange: exchangeName, type: ExchangeType.Direct);

var queueDeclareResult = await channel.QueueDeclareAsync();
string queueName = queueDeclareResult.QueueName;

await channel.QueueBindAsync(queueName, exchange: exchangeName, routingKey);

var consumer = new AsyncEventingBasicConsumer(channel);

consumer.ReceivedAsync += (model, eventArgument) =>
{
    var body = eventArgument.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    var routingKey = eventArgument.RoutingKey;
    Console.WriteLine($" [x] Received '{routingKey}':'{message}'");
    return Task.CompletedTask;
};

await channel.BasicConsumeAsync(queueName, autoAck: true, consumer);

Console.WriteLine(" Press [enter] to exit.");
Console.ReadLine();
