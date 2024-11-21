using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;
using SqlKata;
using static Planerp.Extensions.UtilityExtension;

namespace Planerp.Repository;

public interface IPriceHistoryRepository
{
    public Task<ComponentPriceHistory> GetPriceApiById(int componentId);
    public Task AddPriceHistory(ComponentPriceHistory priceHistory);
    public Task<IEnumerable<ComponentPriceHistory>> GetAllPriceHistory();
    public Task AddPriceListHistory(ComponentPriceLists componentPrice);
}

public class PriceHistoryRepository : IPriceHistoryRepository
{
    private PostgresqlConnectionProvider _connection;

    public PriceHistoryRepository(PostgresqlConnectionProvider postgresqlConn)
    {
        this._connection = postgresqlConn;
    }

    public async Task AddPriceHistory(ComponentPriceHistory priceHistory)
    {
        var CheckIfPriceHistoryExists_Query = new Query(nameof(ComponentPriceHistory))
            .SelectAllClassProperties(new[] { typeof(ComponentPriceHistory) })
            .Where(FullNameof(nameof(ComponentPriceHistory.ComponentId)), priceHistory.ComponentId);

        var UpdatePriceHistory_Query = new Query(nameof(ComponentPriceHistory))
            .AsUpdate(priceHistory)
            .Where(FullNameof(nameof(ComponentPriceHistory.ComponentId)), priceHistory.ComponentId);

        using (var conn = _connection.CreateConnection())
        {
            var isComponentHistoryExists =
                await conn.QuerySingleSqlKataAsync<ComponentPriceHistory>(
                    CheckIfPriceHistoryExists_Query,
                    true
                );
            if (isComponentHistoryExists == null)
            {
                await conn.InsertToDatabase(priceHistory);
            }
            else
            {
                await conn.ExecuteSqlKataAsync(UpdatePriceHistory_Query, true);
            }
        }
    }

    public async Task<IEnumerable<ComponentPriceHistory>> GetAllPriceHistory()
    {
        var GetAllPriceHistory_Query = new Query(
            nameof(ComponentPriceHistory)
        ).SelectAllClassProperties(new[] { typeof(ComponentPriceHistory) });

        using (var conn = _connection.CreateConnection())
        {
            var ComponentPriceHistoryLists = await conn.QuerySqlKataAsync<ComponentPriceHistory>(
                GetAllPriceHistory_Query,
                true
            );
            return ComponentPriceHistoryLists;
        }
    }

    public async Task AddPriceListHistory(ComponentPriceLists componentPrice)
    {
        using (var conn = _connection.CreateConnection())
        {
            await conn.InsertToDatabase(componentPrice);
        }
    }

    public async Task<ComponentPriceHistory> GetPriceApiById(int componentId)
    {
        var GetPriceApiById_Query = new Query(nameof(ComponentPriceHistory))
            .SelectAllClassProperties(new[] { typeof(ComponentPriceHistory) })
            .Where(FullNameof(nameof(ComponentPriceHistory.ComponentId)), componentId);

        using (var conn = _connection.CreateConnection())
        {
            var priceApiData = await conn.QuerySingleSqlKataAsync<ComponentPriceHistory>(
                GetPriceApiById_Query,
                true
            );
            return priceApiData;
        }
    }
}
