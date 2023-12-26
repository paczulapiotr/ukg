using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UKG.Api.Models;
using UKG.Auth.Models;
using UKG.Backend.Services;

namespace UKG.Api.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ILogger<AccountController> _logger;
    private readonly IAuthService _authService;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ILogger<AccountController> logger, IAuthService authService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        try
        {
            if (ModelState.IsValid)
            {
                var user = new AppUser { UserName = model.UserName };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    _logger.LogInformation($"User {user.UserName} registered successfully.");
                    return Ok(new { Message = "User registered successfully" });
                }
                else
                {
                    _logger.LogWarning($"Failed to register user {user.UserName}. Errors: {string.Join(", ", result.Errors)}");
                    return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
                }
            }

            _logger.LogWarning("Invalid registration data received.");
            return BadRequest(new { Message = "Invalid registration data", Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred during user registration. Exception: {ex}");
            return StatusCode(500, new { Message = "Internal server error" });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        try
        {
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                _logger.LogInformation($"User {model.UserName} logged in successfully.");
                return Ok(new { Message = "Login successful" });
            }
            else
            {
                _logger.LogWarning($"Invalid login attempt for user {model.UserName}.");
                return BadRequest(new { Message = "Invalid login attempt" });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred during user login. Exception: {ex}");
            return StatusCode(500, new { Message = "Internal server error" });
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out successfully.");
            return Ok(new { Message = "Logout successful" });
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred during user logout. Exception: {ex}");
            return StatusCode(500, new { Message = "Internal server error" });
        }
    }

    // Other actions and methods...

    [HttpGet]
    [Authorize]
    public IActionResult Info()
    {
        var info = _authService.GetUser(); ;
        return Ok(new { Name = info.FullName, Expiration = info.AuthExpiration });
    }
}
