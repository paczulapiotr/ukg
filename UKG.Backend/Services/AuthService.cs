
namespace UKG.Backend.Services;

public class AuthService : IAuthService
{
    public async Task<int> GetUserID()
    {
        return await ValueTask.FromResult(1);
    }
}