
using System.Security.Claims;
using UKG.Backend.Models;

namespace UKG.Backend.Services;

public class AuthService : IAuthService
{
    private readonly ClaimsPrincipal _claimsPrincipal;

    public AuthService(ClaimsPrincipal claimsPrincipal)
    {
        _claimsPrincipal = claimsPrincipal;
    }

    public int GetID()
    {
        var idString = _claimsPrincipal.Claims
            .SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(int.TryParse(idString, out int id))
        {
            return id;
        }

        throw new UnauthorizedAccessException();
    }

    public UserSimple GetUser()
    {
        var expirationString = _claimsPrincipal.Claims
            .SingleOrDefault(c => c.Type == ClaimTypes.Expiration)?.Value;

        DateTime? expiration = expirationString is null
            ? null
            : DateTime.Parse(expirationString);

        var name = _claimsPrincipal.Claims
            .SingleOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value;

        var id = GetID();

        return new()
        {
            ID = id,
            FullName = name,
            AuthExpiration = expiration,
        };
    }
}