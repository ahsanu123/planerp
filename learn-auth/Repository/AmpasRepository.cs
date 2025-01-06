using AMS.AppIdentity;
using AMS.Extension;
using AMS.Model;
using Microsoft.Data.Sqlite;
using Newtonsoft.Json;
using SqlKata;

namespace AMS.Repository;

/*
 * Ampas Repository Plan:
 * - AddAmpasForUser
 * - GetListAmpasForUser
 * - GetBillForUser(month)
 * - ChangeAmpasPrice
 * */

public interface IAmpasRepository
{
    public Task<AMSResult> AddAmpasForUser(User user, int amount);
    public Task<List<AmpasModel>?> GetListAmpasForUser(User user, DateTime date);
    public Task<AmpasDailySummary> GetDailySummary(DateTime date);
    public Task<double> GetBillForUser(User user, DateTime date);
    public Task<bool> ChangeAmpasPrice(double price);
    public Task<double> GetCurrentPrice();
}

public class AmpasRepository : IAmpasRepository
{
    private readonly ISqliteConnectionProvider _conn;

    public AmpasRepository(ISqliteConnectionProvider connectionProvider)
    {
        _conn = connectionProvider;
    }

    private async Task _createConnection(Func<SqliteConnection, Task> connection)
    {
        using (var conn = _conn.CreateConnection())
        {
            await connection(conn);
        }
    }

    private async Task<double> _getCurrentAmpasPrice()
    {
        double price = 0;
        var GetCurrentAmpasPrice_Query = new Query(nameof(AmpasPrice)).OrderByDesc(
            nameof(AmpasPrice.ChangedTime)
        );
        await _createConnection(async conn =>
        {
            var prices = await conn.QuerySqlKataAsync<AmpasPrice>(GetCurrentAmpasPrice_Query);
            price = prices.ToList()[0].Price;
        });
        return price;
    }

    public async Task<AMSResult> AddAmpasForUser(User user, int amount)
    {
        var result = new AMSResult { Success = false, Message = null };
        var currentPrice = await _getCurrentAmpasPrice();
        var ampasRecord = new AmpasModel
        {
            UserId = user.Id,
            Price = currentPrice,
            Amount = amount,
            TakenTime = DateTime.Now,
            ProductionDate = DateTime.Now,
            Description =
                $"{user.UserName} Mengambil {amount} ampas pada {DateTime.Now.ToLongDateString()}",
        };

        await _createConnection(async conn =>
        {
            await conn.InsertToDatabase<AmpasModel>(ampasRecord, true);
        });
        return result;
    }

    public async Task<bool> ChangeAmpasPrice(double price)
    {
        var newPrice = new AmpasPrice { Price = price, ChangedTime = DateTime.Now };
        await _createConnection(async conn =>
        {
            await conn.InsertToDatabase<AmpasPrice>(newPrice);
        });
        return true;
    }

    public async Task<double> GetBillForUser(User user, DateTime date)
    {
        double totalBill = 0;

        var GetRecordForUser_Query = new Query(nameof(AmpasModel))
            .Where(nameof(AmpasModel.UserId), user.Id)
            .WhereDatePart("year", nameof(AmpasModel.TakenTime), date.ToString("yyyy"))
            .WhereDatePart("month", nameof(AmpasModel.TakenTime), date.ToString("MM"));

        await _createConnection(async conn =>
        {
            var records = await conn.QuerySqlKataAsync<AmpasModel>(GetRecordForUser_Query);
            foreach (var record in records)
            {
                totalBill += record.Amount * record.Price;
            }
        });

        return totalBill;
    }

    public async Task<List<AmpasModel>?> GetListAmpasForUser(User user, DateTime date)
    {
        IEnumerable<AmpasModel> records = null;

        var GetRecordForUser_Query = new Query(nameof(AmpasModel))
            .Where(nameof(AmpasModel.UserId), user.Id)
            .WhereDatePart("year", nameof(AmpasModel.TakenTime), date.ToString("yyyy"))
            .WhereDatePart("month", nameof(AmpasModel.TakenTime), date.ToString("MM"));

        await _createConnection(async conn =>
        {
            records = await conn.QuerySqlKataAsync<AmpasModel>(GetRecordForUser_Query);
        });

        return records.ToList();
    }

    public async Task<AmpasDailySummary> GetDailySummary(DateTime date)
    {
        var summary = new AmpasDailySummary();

        var GetRecord_Query = new Query(nameof(AmpasModel)).WhereDate(
            nameof(AmpasModel.TakenTime),
            date.ToString("yyyy-MM-dd")
        );

        await _createConnection(async conn =>
        {
            var userTakeCount = new List<KeyValuePair<string, int>>();
            var records = await conn.QuerySqlKataAsync<AmpasModel>(GetRecord_Query);

            foreach (var record in records)
            {
                var GetUserForId_Query = new Query(nameof(User)).Where(
                    nameof(User.Id),
                    record.UserId
                );
                var user = Task.Run<User>(async () =>
                {
                    var user = await conn.QuerySingleSqlKataAsync<User>(GetUserForId_Query);
                    return user;
                }).Result;

                userTakeCount.Add(new KeyValuePair<string, int>(user.UserName, record.Amount));
            }

            summary.TotalTaken = records.Select(record => record.Amount).ToList().Sum();
            summary.TotalTakenPrice = records
                .Select(record => record.Price * record.Amount)
                .ToList()
                .Sum();
            summary.UserTakenCount = userTakeCount;
        });

        return summary;
    }

    public async Task<double> GetCurrentPrice()
    {
        return await _getCurrentAmpasPrice();
    }
}
