using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public class UkgSqlRepository : IUkgRepository
{
    private readonly UkgDbContext _ctx;

    public UkgSqlRepository(UkgDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default)
    {
        await _ctx.AddAsync(ukgSummary, cancellationToken);
        await _ctx.SaveChangesAsync(cancellationToken);
    }

    public Task<UkgSummary?> FindOneByID(int id, int submitterId, CancellationToken cancellationToken = default)
    {
        return _ctx.UKGSummaries.AsNoTracking()
            .Where(x => x.SubmitterID == submitterId)
            .FirstOrDefaultAsync(x => x.ID == id, cancellationToken);
    }

    public IQueryable<UkgSummary> Query()
    {
        return _ctx.UKGSummaries.AsNoTracking();
    }
}