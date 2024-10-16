using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Planerp.Model;

namespace Planerp.PlanerpMigration;

public class MasterContext : IdentityDbContext<CustomIdentityModel>
{
    public MasterContext(DbContextOptions<MasterContext> option)
        : base(option) { }

    public DbSet<Storage> storage { get; set; }
    public DbSet<Project> project { get; set; }
    public DbSet<Component> component { get; set; }
    public DbSet<ResourceDoc> resourceDoc { get; set; }
    public DbSet<ProducingStep> producingStep { get; set; }
    public DbSet<LoggerModel> logger { get; set; }
}
