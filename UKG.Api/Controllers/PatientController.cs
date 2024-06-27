using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UKG.Api.Models;
using UKG.Backend.Exceptions;
using UKG.Backend.Models;
using UKG.Backend.Services;

namespace UKG.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/patient")]
public class PatientController : ControllerBase
{
    private readonly ILogger<PatientController> _logger;
    private readonly IUkgService _ukgService;
    private readonly IMapper _mapper;

    public PatientController(IMapper mapper, IUkgService ukgService, ILogger<PatientController> logger)
    {
        _mapper = mapper;
        _ukgService = ukgService;
        _logger = logger;
    }

    [HttpGet("list")]
    public async Task<ActionResult> List([FromQuery] string? search, int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        var result = await _ukgService.ListPatients(search, page, pageSize, cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get([FromRoute] string id, CancellationToken cancellationToken = default)
    {
        var result = await _ukgService.FindPatient(id, cancellationToken);

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddPatientModel model, CancellationToken cancellationToken = default)
    {
        var patient = _mapper.Map<PatientSimple>(model);

        var patientId = await _ukgService.AddPatient(patient, cancellationToken);

        return Ok(patientId);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Edit([FromRoute] int id, [FromBody] UpdatePatientModel model, CancellationToken cancellationToken = default)
    {
        var patient = _mapper.Map<PatientSimple>(model);
        patient.Id = id;

        await _ukgService.EditPatient(id, patient, cancellationToken);

        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        await _ukgService.DeletePatient(id, cancellationToken);

        return Ok();
    }
}





