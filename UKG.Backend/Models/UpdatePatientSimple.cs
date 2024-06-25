namespace UKG.Backend.Models;

public record UpdatePatientSimple
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Pesel { get; set; }
    public DateOnly? Birthday { get; set; }
}
