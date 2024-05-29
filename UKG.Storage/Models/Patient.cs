using System.ComponentModel.DataAnnotations.Schema;

namespace UKG.Storage.Models;

public record Patient
{
    public int ID { get; set; }
    public int SubmitterID { get; set; }
    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }
    public required string Pesel { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public string? FullName { get; set; }
    public DateOnly Birthday { get; set; }
    public ICollection<UkgSummary>? Ukgs { get; set; }
}