using System.Data;
using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;

namespace Planerp.Repository;

public interface ISeedRepository
{
    public Task Seed();
}

public class SeedRepository : ISeedRepository
{
    private PostgresqlConnectionProvider _conn;
    private List<Project> projects = new List<Project>();
    private List<LoggerModel> loggers = new List<LoggerModel>();
    private List<Component> components = new List<Component>();

    public SeedRepository(PostgresqlConnectionProvider postgresqlConn)
    {
        this._conn = postgresqlConn;
    }

    public async Task Seed()
    {
        this.projects.Add(
            new Project
            {
                Name = "Sudi Keyboard V2 - Split Keyboard",
                ImageUrl = "https://cdn-shop.adafruit.com/970x728/6062-00.jpg",
                Description =
                    "This breakout board will solve all your multi-rail power-monitoring problems. Instead of struggling with up to 6 multimeters, you can just use the handy INA3221 chip on this breakout to both measure both the high side voltage and DC current draw of up to three power supplies over I2C with ±1% precision.",
            }
        );
        this.components.Add(
            new Component
            {
                Name = "INA3221",
                Description =
                    "A precision amplifier measures the voltage across the built-in 0.05 ohm, 1% sense resistors. Since the amplifier maximum input difference is ±163.8mV this means it can measure up to ±3.2 Amps. With the internal 13 bit ADC, the resolution at ±3.2A range is 0.4mA. Advanced hackers can remove the 0.05 ohm current sense resistor and replace it with their own to change the range (say a 0.01 ohm to measure up 16.4 Amps with a resolution of 2mA)",
            }
        );
        this.loggers.Add(new LoggerModel { Title = "Create Sudi Keyboard Project" });

        using (IDbConnection conn = _conn.CreateConnection())
        {
            foreach (var project in this.projects)
            {
                await conn.InsertToDatabase(project);
            }
            foreach (var logger in this.loggers)
            {
                await conn.InsertToDatabase(logger);
            }
            foreach (var component in this.components)
            {
                await conn.InsertToDatabase(component);
            }
        }
    }
}
