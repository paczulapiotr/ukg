namespace UKG.Backend.Models;

public record UkgSimple
{
    public int Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public string? Summary { get; set; }
}