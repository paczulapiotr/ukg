namespace UKG.Backend.Services;

public interface IAuthService
{
    Task<int> GetUserID();
}