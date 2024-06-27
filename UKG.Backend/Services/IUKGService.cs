using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IUkgService
{
    Task<int> Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task Edit(int id, UkgSummary ukgSummary, CancellationToken cancellationToken = default);
    Task<TableData<UkgSimple>> ListUkgs(int patientId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
    Task<UkgSummary> Find(int id, CancellationToken cancellationToken = default);
    Task<TableData<PatientSimple>> ListPatients(string? search, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
    Task<PatientSimple> FindPatient(string id, CancellationToken cancellationToken = default);
    Task<int> AddPatient(PatientSimple patient, CancellationToken cancellationToken = default);
    Task EditPatient(int patientId, PatientSimple dto, CancellationToken cancellationToken = default);
    Task Delete(int id, CancellationToken cancellationToken = default);
    Task DeletePatient(int id, CancellationToken cancellationToken);
}