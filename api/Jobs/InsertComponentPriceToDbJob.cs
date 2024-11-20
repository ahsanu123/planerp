using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Planerp.Model;
using Planerp.Repository;
using Quartz;

namespace Planerp.Jobs;

public class InsertComponentPriceToDbJob : IJob
{
    private IHttpClientFactory _httpClient;
    private IPriceHistoryRepository _priceHistoryRepo;
    private ILogger _logger;

    public InsertComponentPriceToDbJob(
        IHttpClientFactory httpClient,
        IPriceHistoryRepository repo,
        ILoggerFactory loggerFactory
    )
    {
        this._httpClient = httpClient;
        this._priceHistoryRepo = repo;
        this._logger = loggerFactory.CreateLogger(nameof(InsertComponentPriceToDbJob));
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var client = _httpClient.CreateClient("InsertoDB");
        client.DefaultRequestHeaders.Add(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
        );
        client.DefaultRequestHeaders.Add(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0"
        );

        var listComponentHistoryList = await _priceHistoryRepo.GetAllPriceHistory();
        foreach (var componentHistory in listComponentHistoryList)
        {
            var result = await client.GetAsync(componentHistory.Url);
            var jsonString = await result.Content.ReadAsStringAsync();

            try
            {
                var obj = JObject.Parse(jsonString);
                var value = obj.SelectToken(componentHistory.Path).ToString();
                var parsedValue = Double.Parse(value);

                var newComponentPrice = new ComponentPriceLists()
                {
                    ComponentId = componentHistory.ComponentId,
                    Price = parsedValue,
                    PriceDate = DateTime.Now,
                };
                _logger.LogInformation("Insert New Pricelist");
                await _priceHistoryRepo.AddPriceListHistory(newComponentPrice);
            }
            catch (System.Exception)
            {
                continue;
            }
        }
    }
}
