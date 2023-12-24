using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task Add(UkgSummary ukgSummary);
    Task<IEnumerable<UkgSimple>> List(string? name, string? pesel, int page = 1, int pageSize = 10);
    Task<UkgSummary> Find(int id);
}