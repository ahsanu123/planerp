using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Send.Extension;
using Send.Model;
using Send.Service;

var builder = Host.CreateEmptyApplicationBuilder(null);
builder.Configuration.AddJsonFile(Path.Join(Directory.GetCurrentDirectory(), "/appsettings.json"));
var configuration = builder.Configuration;

var rabbitMQClientConfiguration = configuration
    .GetSection(nameof(RabbitMQFactorySetting))
    .Get<RabbitMQFactorySetting>();

await builder.AddRabbitMQClient(rabbitMQClientConfiguration);

builder.Services.AddHostedService<ConsoleWatcher>();
builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();

var host = builder.Build();
host.Run();
