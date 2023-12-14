using Microsoft.EntityFrameworkCore;

namespace UKG.Storage.Context;

public interface IUkgDbContextFactory {
    UkgDbContext CreateDbContext();
}

public class UkgDbContextFactory : IUkgDbContextFactory
{
    public UkgDbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<UkgDbContext>();
        optionsBuilder.UseSqlite("Data Source=ukg_database.db");

        return new UkgDbContext(optionsBuilder.Options);
    }
}
