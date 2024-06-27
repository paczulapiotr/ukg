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

    public async Task Update(int id, UkgSummary ukgSummary, CancellationToken cancellationToken = default)
    {
        var ukg = await _ctx.UKGSummaries.FirstAsync(x => x.ID == id && x.SubmitterID == ukgSummary.SubmitterID, cancellationToken);

        if (ukg is null) throw new InvalidOperationException($"Could not find UKG with id ${id}");

        ukg.Ao = ukgSummary.Ao?.Trim();
        ukg.ACS = ukgSummary.ACS?.Trim();
        ukg.LA = ukgSummary.LA?.Trim();
        ukg.RV = ukgSummary.RV?.Trim();
        ukg.LVs = ukgSummary.LVs?.Trim();
        ukg.LVd = ukgSummary.LVd?.Trim();
        ukg.IVSs = ukgSummary.IVSs?.Trim();
        ukg.IVSd = ukgSummary.IVSd?.Trim();
        ukg.LVPWs = ukgSummary.LVPWs?.Trim();
        ukg.LVPWd = ukgSummary.LVPWd?.Trim();
        ukg.EF = ukgSummary.EF?.Trim();
        ukg.Kurczliwosc = ukgSummary.Kurczliwosc?.Trim();
        ukg.Osierdzie = ukgSummary.Osierdzie?.Trim();
        ukg.ZastawkaMitralna = ukgSummary.ZastawkaMitralna?.Trim();
        ukg.DopplerMitralna = ukgSummary.DopplerMitralna?.Trim();
        ukg.VmaxMitralna = ukgSummary.VmaxMitralna?.Trim();
        ukg.GmaxMitralna = ukgSummary.GmaxMitralna?.Trim();
        ukg.ZastawkaAortalna = ukgSummary.ZastawkaAortalna?.Trim();
        ukg.DopplerAortalna = ukgSummary.DopplerAortalna?.Trim();
        ukg.VmaxAortalna = ukgSummary.VmaxAortalna?.Trim();
        ukg.GmaxAortalna = ukgSummary.GmaxAortalna?.Trim();
        ukg.ZastawkaTrojdzielna = ukgSummary.ZastawkaTrojdzielna?.Trim();
        ukg.DopplerTrojdzielna = ukgSummary.DopplerTrojdzielna?.Trim();
        ukg.VmaxTrojdzielna = ukgSummary.VmaxTrojdzielna?.Trim();
        ukg.GmaxTrojdzielna = ukgSummary.GmaxTrojdzielna?.Trim();
        ukg.ZastawkaPnia = ukgSummary.ZastawkaPnia?.Trim();
        ukg.DopplerPnia = ukgSummary.DopplerPnia?.Trim();
        ukg.Summary = ukgSummary.Summary?.Trim();
        ukg.UpdatedAt = DateTime.UtcNow;

        _ctx.Update(ukg);
        await _ctx.SaveChangesAsync(cancellationToken);
    }

    public async Task Delete(int id, CancellationToken cancellationToken)
    {
        var ukg = await _ctx.UKGSummaries.FindAsync(id, cancellationToken);

        if (ukg is null) throw new InvalidOperationException("Ukg not found");

        _ctx.UKGSummaries.Remove(ukg);
        await _ctx.SaveChangesAsync(cancellationToken);
    }

    public async Task<UkgSummary?> FindOneByID(int id, int submitterId, CancellationToken cancellationToken = default)
    {
        return await _ctx.UKGSummaries.AsNoTracking()
            .Where(x => x.SubmitterID == submitterId)
            .Include(x => x.Patient)
            .FirstOrDefaultAsync(x => x.ID == id, cancellationToken);
    }

    public IQueryable<UkgSummary> Query()
    {
        return _ctx.UKGSummaries.AsNoTracking();
    }
}