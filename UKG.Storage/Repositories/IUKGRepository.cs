using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public interface IUkgRepository
{
    Task Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task<UkgSummary?> FindOneByID(int id, CancellationToken cancellationToken = default);
    IQueryable<UkgSummary> Query();
}