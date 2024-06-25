namespace UKG.Api.Models;

public record UpdatePatientModel
{
    public string? Pesel { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateOnly? Birthday { get; set; }
}

