using Microsoft.EntityFrameworkCore;

namespace UKG.Storage.Context;

public interface IUkgDbContextFactory
{
    UkgDbContext CreateDbContext();
}

public class UkgDbContextFactory : IDbContextFactory<UkgDbContext>
{
    private string? _connString;

    public UkgDbContextFactory WithConnectionString(string connString)
    {
        _connString = connString;
        return this;
    }

    public UkgDbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<UkgDbContext>();
        optionsBuilder.UseSqlite(_connString);
        
        return new UkgDbContext(optionsBuilder.Options);
    }
}
