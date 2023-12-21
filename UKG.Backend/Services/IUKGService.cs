using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task Add(UkgSummary ukgSummary);
    Task<IEnumerable<UkgSummary>> Find(int page = 1, PageSize = 10, string? name, string? pesel);
}