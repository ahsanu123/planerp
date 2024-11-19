using Planerp.Model;
using Planerp.Repository;
using Quartz;

namespace Planerp.Jobs;

public class InsertComponentPriceToDbJob : IJob
{
    private GenericRepository<Component> _repo;

    public InsertComponentPriceToDbJob(GenericRepository<Component> repo)
    {
        this._repo = repo;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        // Code that sends a periodic email to the user (for example)
        // Note: This method must always return a value
        // This is especially important for trigger listeners watching job execution

        var newComponent = new Component()
        {
            Name = "Scheduled Component",
            ImageUrl = "",
            Type = "",
            Category = "",
            Description = "Description",
            Price = 1000,
            Capital = 100,
            Supplier = "",
            SupplierLink = "",
            IsAssembly = false,
            Stock = 1,
            BuyDate = new DateTime(),
        };

        await this._repo.Add(newComponent);
    }
}
