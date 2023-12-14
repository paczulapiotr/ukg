using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public interface IUKGRepository
{
    Task Add(UKGSummary ukgSummary);
    Task<UKGSummary> FindOneByID(int id);
    IQueryable<UKGSummary> Query();
}