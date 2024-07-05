using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using UKG.Api.Models.Common;
using UKG.Backend.Exceptions;

namespace UKG.Api.Filters;

public class MainExceptionFilter : IExceptionFilter
{
    private readonly ILogger<MainExceptionFilter> _logger;

    public MainExceptionFilter(ILogger<MainExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        if (context.Exception is MainException exception)
        {
            _logger.LogError("Exception with code {ErrorCode}: {ErrorMessage}", exception.ExceptionCode, exception.Message);
            var response = new ErrorModel(exception.ExceptionCode);

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };

            // Mark exception as handled
            context.ExceptionHandled = true;
        }
    }
}

