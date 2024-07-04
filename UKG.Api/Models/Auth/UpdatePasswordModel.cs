namespace UKG.Api.Models.Auth;

public record UpdatePasswordModel
{
    public string? CurrentPassword { get; set; }
    public string? NewPassword { get; set; }
    public string? RepeatPassword { get; set; }
}

