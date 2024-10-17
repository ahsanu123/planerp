using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Planerp.Model;

namespace Planerp.PlanerpMigration;

public class MasterContext : IdentityDbContext<CustomIdentityModel>
{
    public MasterContext(DbContextOptions<MasterContext> option)
        : base(option) { }

    public DbSet<Storage> Storage { get; set; }
    public DbSet<Project> Project { get; set; }
    public DbSet<Component> Component { get; set; }
    public DbSet<ResourceDoc> ResourceDoc { get; set; }
    public DbSet<ProducingStep> ProducingStep { get; set; }
    public DbSet<LoggerModel> LoggerModel { get; set; }
}
