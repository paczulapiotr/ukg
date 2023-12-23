using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UKG.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]/[action]")]
public class UkgController : ControllerBase
{
    private readonly ILogger<UkgController> _logger;

    public UkgController(ILogger<UkgController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult List([FromQuery] string? pesel, [FromQuery] string? name)
    {
        var ctx = this.HttpContext;
        var user = this.User;
        return Ok();
    }

    [HttpGet("{id}")]
    public ActionResult Get([FromRoute] string id)
    {
        return Ok();
    }

    [HttpPost]
    public ActionResult Add([FromBody] object model)
    {
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


    [HttpGet("{id}")]
    public ActionResult Pdf([FromRoute] string id)
    {
        return Ok();
    }
}

