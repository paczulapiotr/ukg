namespace UKG.Backend.Models;

public record PatientSimple
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Pesel { get; set; }
    public string FullName => $"{FirstName} {LastName}";
    public required DateOnly Birthday { get; set; }
}
