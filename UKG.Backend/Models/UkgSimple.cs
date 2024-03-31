namespace UKG.Backend.Models;

public record UkgSimple
{
    public int? ID { get; set; }
    public int? SubmitterID { get; set; }
    public string? SubmitterName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public required string Pesel { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string FullName => $"{FirstName} {LastName}";
    public DateOnly Birthday { get; set; }
}