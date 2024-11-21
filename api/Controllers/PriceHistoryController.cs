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
    [Route("Add")]
    public async Task<IActionResult> UpsertPriceHistory(
        [FromBody] ComponentPriceHistory priceHistory
    )
    {
        await _priceHistoryRepo.AddPriceHistory(priceHistory);
        return Ok();
    }

    [HttpGet]
    [Route("GetAll")]
    public async Task<IActionResult> GetAllPriceHistory()
    {
        var listAllPrice = await _priceHistoryRepo.GetAllPriceHistory();
        return Ok(listAllPrice);
    }

    [HttpGet]
    [Route("GetById/{componentId}")]
    public async Task<IActionResult> GetApiPrice([FromRoute] int componentId)
    {
        var priceApiData = await _priceHistoryRepo.GetPriceApiById(componentId);
        if (priceApiData == null)
            return NotFound();
        return Ok(priceApiData);
    }
}
