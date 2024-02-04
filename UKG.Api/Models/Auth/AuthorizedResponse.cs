
namespace UKG.Api.Models.Auth;

public record AuthorizedResponse
{
    public required string Token { get; set; }
    public required string RefreshToken { get; set; }
    public required DateTime TokenExpiration { get; set; }
    public required DateTime RefreshTokenExpiration { get; set; }
}

