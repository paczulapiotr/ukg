namespace UKG.Api.Models;

public record AddPatientModel
{
    public required string Pesel { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateOnly Birthday { get; set; }
    public bool? OverridePesel { get; set; }
}

