using Microsoft.AspNetCore.Mvc;
using Planerp.Model;
using Planerp.Repository;

namespace Planerp.Controllers;

[ApiController]
[Route("[controller]")]
public class PriceHistoryController : Controller
{
    private IPriceHistoryRepository _priceHistoryRepo;

    public PriceHistoryController(IPriceHistoryRepository priceHistoryRepo)
    {
        this._priceHistoryRepo = priceHistoryRepo;
    }

    [HttpPost]
    public async Task<IActionResult> UpsertPriceHistory(
        [FromBody] ComponentPriceHistory priceHistory
    )
    {
        await _priceHistoryRepo.AddPriceHistory(priceHistory);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPriceHistory()
    {
        var listAllPrice = await _priceHistoryRepo.GetAllPriceHistory();
        return Ok(listAllPrice);
    }
}
