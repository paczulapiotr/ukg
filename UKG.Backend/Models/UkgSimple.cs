namespace UKG.Backend.Models;

public record UkgSimple
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? Summary { get; set; }
}