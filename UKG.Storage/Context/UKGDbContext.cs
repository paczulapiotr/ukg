using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;

public class UkgDbContext : DbContext
{
    public DbSet<UkgSummary> UKGSummaries { get; set; }
    public DbSet<Patient> Patients { get; set; }

    public UkgDbContext(DbContextOptions<UkgDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UkgDbContext).Assembly);
    }
}