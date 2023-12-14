using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public interface IUkgRepository
{
    Task Add(UkgSummary ukgSummary);
    Task<UkgSummary> FindOneByID(int id);
    IQueryable<UkgSummary> Query();
}