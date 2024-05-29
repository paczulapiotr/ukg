namespace UKG.Backend.Models;

public record UserSimple
{
	public int? ID { get; set; }
	public string? FullName { get; set; }
	public DateTime? AuthExpiration { get; set; }
}

