using UKG.Backend.Models;
using UKG.Storage.Repositories;

namespace UKG.Backend.Services;

public class UKGService : IUKGService
{
    private readonly IUKGRepository _repository;
    // TODO: add mapper
    // TODO: add auth service

    public UKGService(IUKGRepository repository)
    {
        _repository = repository;
    }

    public Task Add(UKGSummary ukgSummary)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UKGSummary>> Find(string? name, string? pesel)
    {
        throw new NotImplementedException();
    }
}
