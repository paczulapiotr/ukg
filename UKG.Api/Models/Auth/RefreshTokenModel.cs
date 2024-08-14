namespace UKG.Api.Models.Auth;

public record RefreshTokenModel
{
    public string? RefreshToken { get; set; }
    public string? AccessToken { get; set; }
}

