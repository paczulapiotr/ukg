namespace UKG.Backend.Models;

public record UkgSimple
{
    public int? ID { get; set; }
    public int? SubmitterID { get; set; }
    public string? SubmitterName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public required string PESEL { get; set; }
    public required string FirstName { get; set; }
    public required string SecondName { get; set; }
    public string FullName => $"{FirstName} {SecondName}";
    public DateOnly Birthday { get; set; }
}