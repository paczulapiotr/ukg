using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUKGService
{
    Task Add(UKGSummary ukgSummary);
    Task<IEnumerable<UKGSummary>> Find(string? name, string? pesel);
}