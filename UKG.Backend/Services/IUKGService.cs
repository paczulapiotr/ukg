using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task Add(UkgSummary ukgSummary);
    Task<IEnumerable<UkgSummary>> Find(string? name, string? pesel, int page = 1, int pageSize = 10);
}