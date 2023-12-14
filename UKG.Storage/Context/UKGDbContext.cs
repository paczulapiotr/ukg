using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;

public class UKGDbContext : DbContext
{
    public DbSet<UKGSummary> UKGSummaries { get; set; }

    public UKGDbContext(DbContextOptions<UKGDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UKGDbContext).Assembly);
    }
}