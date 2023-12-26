using UKG.Backend.Models;

namespace UKG.Backend.Services;

public interface IAuthService
{
    int GetID();
    SimpleUser GetUser();
}