using UKG.Backend.Models;
using UKG.Storage.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace UKG.Backend.Services;

public class UkgService : IUkgService
{
    private readonly IUkgRepository _repository;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public UkgService(IUkgRepository repository, IMapper mapper, IAuthService authService)
    {
        _repository = repository;
        _mapper = mapper;
        _authService = authService;
    }

    public async Task Add(UkgSummary ukgSummary, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();

        var ukg = _mapper.Map<UkgSummary, Storage.Models.UkgSummary>(ukgSummary,
            opts => opts.AfterMap((src, dest) => { dest.SubmitterID = submitterId; }));

        await _repository.Add(ukg, cancellationToken);
    }

    public async Task<UkgSummary> Find(int id, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var ukg = await _repository.FindOneByID(id, submitterId, cancellationToken);

        return _mapper.Map<UkgSummary>(ukg);
    }

    public async Task<TableData<UkgSimple>> List(string? name, string? pesel, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var submitterId = _authService.GetID();
        var query = _repository.Query().Where(u => u.SubmitterID == submitterId);

        if (name is not null)
        {
            query = query.Where(x => x.FullName!.Contains(name, StringComparison.InvariantCultureIgnoreCase));
        }

        if (pesel is not null)
        {
            query = query.Where(x => x.Pesel!.Contains(pesel, StringComparison.InvariantCultureIgnoreCase));
        }

        var total = await query.CountAsync();

        var ukgs = await query
            .Where(u => u.SubmitterID == submitterId)
            .OrderByDescending(u => u.FullName)
            .Skip(Math.Max(0, (page - 1) * pageSize))
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new TableData<UkgSimple>(total, _mapper.Map<UkgSimple[]>(ukgs));
    }

}
