using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UKG.Api.Models;
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
    public async Task<ActionResult> List([FromQuery] string pesel, int page = 1, int pageSize = 10)
    {
        var result = await _ukgService.ListPatients(pesel, page, pageSize);

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddPatientModel model, CancellationToken cancellationToken = default)
    {
        var patient = _mapper.Map<PatientSimple>(model);

        var patientId = await _ukgService.AddPatient(patient, cancellationToken);

        return Ok(patientId);
    }

    [HttpDelete]
    public async Task<ActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        await _ukgService.DeletePatient(id, cancellationToken);

        return Ok();
    }
}





