using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task<int> Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task<TableData<UkgSimple>> ListUkgs(int patientId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
    Task<UkgSummary> Find(int id, CancellationToken cancellationToken = default);
    Task<TableData<PatientSimple>> ListPatients(string? search, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
    Task<int> AddPatient(PatientSimple patient, CancellationToken cancellationToken = default);
    Task UpdatePatient(string id, UpdatePatientSimple patient, CancellationToken cancellationToken = default);
    Task Delete(int id, CancellationToken cancellationToken = default);
    Task DeletePatient(int id, CancellationToken cancellationToken);
}