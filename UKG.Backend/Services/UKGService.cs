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

    public async Task Add(UkgSummary ukgSummary)
    {
        var submitterId = await _authService.GetUserID();
        var ukg = _mapper.Map<UkgSummary, Storage.Models.UkgSummary>(ukgSummary,
            opts => opts.AfterMap((src, dest) => { dest.SubmitterID = submitterId; }));

        await _repository.Add(ukg);
    }

    public async Task<IEnumerable<UkgSummary>> Find(int page = 1, PageSize = 10, string? name, string? pesel)
    {
        var submitterId = _authService.GetUserID();
        var query = _repository.Query();

        if (name is not null)
        {
            query = query.Where(x => x.FullName!.Contains(name, StringComparison.InvariantCultureIgnoreCase));
        }

        if (pesel is not null)
        {
            query = query.Where(x => x.PESEL!.Contains(pesel, StringComparison.InvariantCultureIgnoreCase));
        }

        var ukgs = await query
            .Where(u => u.SubmitterID == submitterId)
            .OrderByDescending(u => u.FullName)
            .Skip(Math.Min(0, (page - 1) * PageSize))
            .Take(PageSize)
            .ToListAsync();

        return _mapper.Map<UkgSummary[]>(ukgs);
    }
}
