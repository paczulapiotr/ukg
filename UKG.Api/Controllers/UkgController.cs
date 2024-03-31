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

    [HttpGet]
    public async Task<ActionResult> List([FromQuery] string? pesel, [FromQuery] string? name, int page = 1, int pageSize = 10)
    {
        var result = await _ukgService.List(name, pesel, page, pageSize);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get([FromRoute] int id)
    {
        var ukg = await _ukgService.Find(id);
        return Ok(ukg);
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddUkgModel model)
    {
        var ukg = _mapper.Map<UkgSummary>(model, opts =>
        {
            opts.AfterMap((src, dest) => dest.CreatedAt = DateTime.UtcNow);
        });

        await _ukgService.Add(ukg);

        return Ok();
    }

    [HttpPost("{id}")]
    public ActionResult Edit([FromRoute] string id, [FromBody] object model)
    {
        return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete([FromRoute] string id)
    {
        return Ok();
    }


    [HttpGet("pdf/{id}")]
    public ActionResult Pdf([FromRoute] string id)
    {
        return Ok();
    }
}

