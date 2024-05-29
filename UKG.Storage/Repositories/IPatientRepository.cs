using UKG.Storage.Models;

namespace UKG.Storage.Repositories;

public interface IPatientRepository
{
    Task Add(Patient patient, CancellationToken cancellationToken = default);
    Task Delete(int id, CancellationToken cancellationToken);
    Task<Patient?> FindOneByID(int id, int submitterId, CancellationToken cancellationToken = default);
    IQueryable<Patient> Query();
}

