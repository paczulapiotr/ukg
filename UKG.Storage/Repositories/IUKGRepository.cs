using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public interface IUkgRepository
{
    Task Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task Delete(int id, CancellationToken cancellationToken);
    Task<UkgSummary?> FindOneByID(int id, int submitterId, CancellationToken cancellationToken = default);
    IQueryable<UkgSummary> Query();
}