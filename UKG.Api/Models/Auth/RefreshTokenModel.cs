namespace UKG.Api.Models.Auth;

public record RefreshTokenModel
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
}

