using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Learn.Cotext;

// look this: https://github.com/dotnet/aspnetcore/blob/c2a442982e736e17ae6bcadbfd8ccba278ee1be6/src/Identity/EntityFrameworkCore/src/IdentityDbContext.cs
// from this tutorial https://www.telerik.com/blogs/new-net-8-aspnet-core-identity-how-implement

public class LearnDbContext : IdentityDbContext
{
    public LearnDbContext(DbContextOptions option)
        : base(option) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("DataSource=learndb;Cache=Shared");
        // base.OnConfiguring(optionsBuilder);
    }
}
