namespace UKG.Api.Models.Common;

public record ErrorModel
{
    public string[] Errors { get; set; }

    public ErrorModel()
    {
        Errors = new string[] {};
    }

    public ErrorModel(params string[] errorCode)
    {
        Errors = errorCode; 
    }
}

