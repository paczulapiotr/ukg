using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task<IEnumerable<UkgSimple>> List(string? name, string? pesel, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
    Task<UkgSummary> Find(int id, CancellationToken cancellationToken = default);
}