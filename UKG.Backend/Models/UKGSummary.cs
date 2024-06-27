namespace UKG.Backend.Models;

public record UkgSummary
{
    public int? Id { get; set; }
    public int? PatientId { get; set; }
    public int? SubmitterId { get; set; }
    public string? SubmitterName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? Ao { get; set; }
    public string? Acs { get; set; }
    public string? La { get; set; }
    public string? Rv { get; set; }
    public string? Lvs { get; set; }
    public string? Lvd { get; set; }
    public string? Ivss { get; set; }
    public string? Ivsd { get; set; }
    public string? Lvpws { get; set; }
    public string? Lvpwd { get; set; }
    public string? Ef { get; set; }
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