namespace UKG.Backend.Models;

public record UkgSummary
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
    public string? Ao { get; set; }
    public string? ACS { get; set; }
    public string? LA { get; set; }
    public string? RV { get; set; }
    public string? LVs { get; set; }
    public string? LVd { get; set; }
    public string? IVSs { get; set; }
    public string? IVSd { get; set; }
    public string? LVPWs { get; set; }
    public string? LVPWd { get; set; }
    public string? EF { get; set; }
    public string? Kurczliwosc { get; set; }
    public string? Osierdzie { get; set; }
    public string? ZastawkaMitralna { get; set; }
    public string? DopplerMitralna { get; set; }
    public string? VmaxMitralna { get; set; }
    public string? GmaxMitralna { get; set; }
    public string? ZastawkaAortalna { get; set; }
    public string? DopplerAortalna { get; set; }
    public string? VmaxAortalna { get; set; }
    public string? GmaxAortalna { get; set; }
    public string? ZastawkaTrojdzielna { get; set; }
    public string? DopplerTrojdzielna { get; set; }
    public string? VmaxTrojdzielna { get; set; }
    public string? GmaxTrojdzielna { get; set; }
    public string? ZastawkaPnia { get; set; }
    public string? DopplerPnia { get; set; }
    public string? Summary { get; set; }
}