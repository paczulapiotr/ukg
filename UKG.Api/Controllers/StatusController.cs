using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UKG.Api.Models.Status;

namespace UKG.Api.Controllers;

[Route("api/status")]
[ApiController]
[AllowAnonymous]
public class StatusController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public StatusController(IConfiguration configuration)
	{
        _configuration = configuration;
    }


    [HttpGet]
    public IActionResult Status()
    {
        return Ok(
            new StatusModel
            {
                Version = _configuration.GetValue<string>("Version") ?? "N/A"
            });
    }

}

