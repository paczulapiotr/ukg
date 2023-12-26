namespace UKG.Backend.Models;

public record SimpleUser
{
	public int? ID { get; set; }
	public string? FullName { get; set; }
	public DateTime? AuthExpiration { get; set; }
}

