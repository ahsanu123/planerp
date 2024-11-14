using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using Send.Model;

namespace Send.Extension;

public static class SendExtension
{
    public static void AddRabbitMQClient(
        this HostApplicationBuilder builder,
        RabbitMQFactorySetting setting
    )
    {
        var factory = new ConnectionFactory
        {
            HostName = setting.HostName,
            Password = setting.Password,
        };
        // ref: line 112
        // https://github.com/dotnet/dotnet/blob/00f73459619ed9aed18dfe72870140323ef6a915/src/aspire/src/Components/Aspire.RabbitMQ.Client/AspireRabbitMQExtensions.cs
        builder.Services.AddSingleton<IChannel>(serviceProvider =>
        {
            using var connection = factory.CreateConnectionAsync().GetAwaiter().GetResult();
            var channel = connection.CreateChannelAsync().GetAwaiter().GetResult();
            return channel;
        });
    }

    public static byte[] GetBytes(this string message)
    {
        return Encoding.UTF8.GetBytes(message);
    }
}
