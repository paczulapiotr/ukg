using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UKG.Api.Models;
using UKG.Backend.Models;
using UKG.Backend.Services;

namespace UKG.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/ukg")]
public class UkgController : ControllerBase
{
    private readonly ILogger<UkgController> _logger;
    private readonly IUkgService _ukgService;
    private readonly IMapper _mapper;

    public UkgController(ILogger<UkgController> logger, IUkgService ukgService, IMapper mapper)
    {
        _logger = logger;
        _ukgService = ukgService;
        _mapper = mapper;
    }



    [HttpGet("list/{patientId}")]
    public async Task<ActionResult> List([FromRoute] int patientId, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var result = await _ukgService.ListUkgs(patientId, page, pageSize, cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        var ukg = await _ukgService.Find(id, cancellationToken);
        return Ok(ukg);
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddUkgModel model, CancellationToken cancellationToken = default)
    {
        var ukg = _mapper.Map<UkgSummary>(model, opts =>
        {
            opts.AfterMap((src, dest) => dest.CreatedAt = DateTime.UtcNow);
        });

        var ukgId = await _ukgService.Add(ukg, cancellationToken);

        return Ok(ukgId);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Edit([FromRoute] int id, [FromBody] EditUkgModel model, CancellationToken cancellationToken = default)
    {
        var ukg = _mapper.Map<UkgSummary>(model);
        await _ukgService.Edit(id, ukg, cancellationToken);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        await _ukgService.Delete(id, cancellationToken);

        return Ok();
    }

    [HttpGet("pdf/{id}")]
    public async Task<ActionResult> Pdf([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        var pdf = await _ukgService.GenerateUkgPdf(id, cancellationToken);

        return File(pdf, "application/pdf");
    }
}

