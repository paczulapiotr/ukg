using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace UKG.Storage.Context;

public class UKGDbContextFactory : IDesignTimeDbContextFactory<UKGDbContext>
{
    public UKGDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<UKGDbContext>();
        optionsBuilder.UseSqlite("Data Source=ukg_database.db");

        return new UKGDbContext(optionsBuilder.Options);
    }
}
