using UKG.Backend.Models;
using UKG.Storage.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;
using FluentValidation;
using UKG.Backend.Exceptions;

namespace UKG.Backend.Services;

public class UkgService : IUkgService
{
    private readonly IUkgRepository _ukgRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IMapper _mapper;
    private readonly IValidator<PatientSimple> _patientValidator;
    private readonly IAuthService _authService;

    public UkgService(
        IUkgRepository ukgRepository,
        IPatientRepository patientRepository,
        IMapper mapper,
        IValidator<PatientSimple> patientValidator,
        IAuthService authService)
    {
        _ukgRepository = ukgRepository;
        _patientRepository = patientRepository;
        _mapper = mapper;
        _patientValidator = patientValidator;
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

    public async Task Edit(int id, Models.UkgSummary ukgSummary, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var ukg = _mapper.Map<Models.UkgSummary, Storage.Models.UkgSummary>(ukgSummary);
        ukg.SubmitterID = submitterId;

        try
        {
            await _ukgRepository.Update(id, ukg, cancellationToken);
        }
        catch (Exception ex)
        {
            throw new MainException(ex, $"Updating UKG for ID ${id} failed");
        }
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

    public async Task<TableData<PatientSimple>> ListPatients(string? search, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var query = _patientRepository.Query().Where(p => p.SubmitterID == submitterId);

        if (search is not null)
        {
            query = query.Where(x => x.Pesel.Contains(search)
            || x.FullName!.Contains(search));
        }

        var total = await query.CountAsync();

        var patients = await query
            .OrderByDescending(u => u.FullName)
            .Skip(Math.Max(0, (page - 1) * pageSize))
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new TableData<PatientSimple>(total, _mapper.Map<PatientSimple[]>(patients));
    }

    public async Task<PatientSimple> FindPatient(string id, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var patient = await _patientRepository.Query().Where(p => p.SubmitterID == submitterId && p.ID == int.Parse(id)).SingleOrDefaultAsync();

        return _mapper.Map<PatientSimple>(patient);
    }


    public async Task<int> AddPatient(PatientSimple dto, CancellationToken cancellationToken = default)
    {
        await _patientValidator.ValidateAndThrowAsync(dto, cancellationToken);

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

    public async Task EditPatient(int patientId, PatientSimple dto, CancellationToken cancellationToken = default)
    {
        await _patientValidator.ValidateAndThrowAsync(dto, cancellationToken);
        var submitterId = _authService.GetID();

        var patient = new Patient
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Pesel = dto.Pesel,
            SubmitterID = submitterId,
            Birthday = dto.Birthday
        };

        try
        {
            await _patientRepository.Update(patientId, patient, cancellationToken);
        }
        catch (Exception ex)
        {
            throw new MainException(ex, $"Updating patient for ID ${patientId} failed");
        }
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
