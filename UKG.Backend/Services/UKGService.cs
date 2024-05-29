using UKG.Backend.Models;
using UKG.Storage.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;

namespace UKG.Backend.Services;

public class UkgService : IUkgService
{
    private readonly IUkgRepository _ukgRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public UkgService(
        IUkgRepository ukgRepository,
        IPatientRepository patientRepository,
        IMapper mapper,
        IAuthService authService)
    {
        _ukgRepository = ukgRepository;
        _patientRepository = patientRepository;
        _mapper = mapper;
        _authService = authService;
    }

    public async Task<int> Add(Models.UkgSummary ukgSummary, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();

        var ukg = _mapper.Map<Models.UkgSummary, Storage.Models.UkgSummary>(ukgSummary,
            opts => opts.AfterMap((src, dest) => { dest.SubmitterID = submitterId; }));

        await _ukgRepository.Add(ukg, cancellationToken);

        return ukg.ID;
    }

    public async Task<Models.UkgSummary> Find(int id, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var ukg = await _ukgRepository.FindOneByID(id, submitterId, cancellationToken);

        return _mapper.Map<Models.UkgSummary>(ukg);
    }

    public async Task<TableData<UkgSimple>> ListUkgs(int patientId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var query = _ukgRepository.Query()
            .Where(u => u.SubmitterID == submitterId && u.PatientID == patientId);

        var total = await query.CountAsync();

        var ukgs = await query
            .OrderByDescending(u => u.Patient.FullName)
            .Skip(Math.Max(0, (page - 1) * pageSize))
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new TableData<UkgSimple>(total, _mapper.Map<UkgSimple[]>(ukgs));
    }

    public async Task<TableData<PatientSimple>> ListPatients(string? pesel, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var query = _patientRepository.Query().Where(p => p.SubmitterID == submitterId);

        if (pesel is not null)
        {
            query = query.Where(x => x.Pesel.Contains(pesel, StringComparison.InvariantCultureIgnoreCase));
        }

        var total = await query.CountAsync();

        var ukgs = await query
            .OrderByDescending(u => u.FullName)
            .Skip(Math.Max(0, (page - 1) * pageSize))
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new TableData<PatientSimple>(total, _mapper.Map<PatientSimple[]>(ukgs));
    }


    public async Task<int> AddPatient(PatientSimple dto, CancellationToken cancellationToken = default)
    {
        // todo: validate dto
        var isUnique = !await _patientRepository.Query().AnyAsync(x => x.Pesel == dto.Pesel, cancellationToken: cancellationToken);
        if (!isUnique)
        {
            throw new ArgumentException("Pesel must be unique.");
        }

        var submitterId = _authService.GetID();

        var patient = new Patient
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Pesel = dto.Pesel,
            SubmitterID = submitterId,
            Birthday = dto.Birthday
        };

        await _patientRepository.Add(patient, cancellationToken);

        return patient.ID;
    }

    public async Task Delete(int id, CancellationToken cancellationToken = default)
    {
        await _ukgRepository.Delete(id, cancellationToken);
    }

    public async Task DeletePatient(int id, CancellationToken cancellationToken)
    {
        await _patientRepository.Delete(id, cancellationToken);
    }
}
