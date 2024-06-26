using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using FluentValidation;
using UKG.Api.Models.Common;

namespace UKG.Api.Filters;

public class FluentValidationExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is ValidationException exception)
        {
            var errorCodes = exception.Errors.Select(x => x.ErrorCode).ToArray();
            var response = new ErrorModel(errorCodes);

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };

            // Mark exception as handled
            context.ExceptionHandled = true;
        }
    }
}

