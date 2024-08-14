using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UKG.Api.Models.Auth;
using UKG.Auth;
using UKG.Backend.Exceptions;

namespace UKG.Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthenticateController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    //private readonly RoleManager<IdentityRole<int>> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthenticateController(
        UserManager<AppUser> userManager,
        //RoleManager<IdentityRole<int>> roleManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        //_roleManager = roleManager;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var authClaims = await GenerateClaims(user);
            var token = CreateToken(authClaims);
            var refreshToken = GenerateRefreshToken();

            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(refreshTokenValidityInDays);

            await _userManager.UpdateAsync(user);

            return Ok(new AuthorizedResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                RefreshToken = refreshToken,
                TokenExpiration = token.ValidTo,
                RefreshTokenExpiration = user.RefreshTokenExpiryTime,
            });
        }

        return Unauthorized();
    }

    private async Task<List<Claim>> GenerateClaims(AppUser? user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("username", user.UserName ?? ""),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(JwtRegisteredClaimNames.Name, user.FullName ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        return authClaims;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var userExists = await _userManager.FindByNameAsync(model.Username);
        if (userExists != null)
            throw new MainException(ApiExceptionCodes.UserAlreadyExists, "User already exists!");

        await ValidatePassword(model.Password, model.RepeatPassword);

        var user = new AppUser
        {
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = model.Username,
            FullName = model.FullName,
        };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            throw new MainException(ApiExceptionCodes.UserCreationError, "User creation failed! Please check user details and try again.");
        }

        return Ok("User created successfully!");
    }

    private async Task ValidatePassword(string password, string repeatPassword)
    {
        if (password != repeatPassword)
            throw new MainException(ApiExceptionCodes.PasswordsNotMatching, "Passwords are not matching!");

        var validationTasks = _userManager.PasswordValidators
            .Select(x => x.ValidateAsync(_userManager, null, password));

        await Task.WhenAll(validationTasks);

        if (validationTasks.Any(vt => !vt.Result.Succeeded))
        {
            throw new MainException(ApiExceptionCodes.PasswordsFormatIncorrect, "Passwords are not matching!");
        }
    }

    [HttpPost]
    [Route("refresh-token")]
    public async Task<IActionResult> RefreshToken(RefreshTokenModel tokenModel)
    {
        if (tokenModel is null)
        {
            return BadRequest("Invalid client request");
        }

        var accessToken = tokenModel.AccessToken;
        var refreshToken = tokenModel.RefreshToken;

        var principal = GetPrincipalFromExpiredToken(accessToken);
        if (principal == null)
        {
            return BadRequest("Invalid access token or refresh token");
        }

        var username = principal?.Identity?.Name;

        var user = await _userManager.FindByNameAsync(username);

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return BadRequest("Invalid access token or refresh token");
        }

        var authClaims = await GenerateClaims(user);
        var newAccessToken = CreateToken(authClaims);
        var newRefreshToken = GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _userManager.UpdateAsync(user);

        return Ok(new AuthorizedResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
            RefreshToken = newRefreshToken,
            TokenExpiration = newAccessToken.ValidTo,
            RefreshTokenExpiration = user.RefreshTokenExpiryTime,
        });
    }

    [HttpPost]
    [Route("logout")]
    public async Task<IActionResult> Logout()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null) return BadRequest("Invalid user name");

        user.RefreshToken = null;
        await _userManager.UpdateAsync(user);

        return NoContent();
    }


    [HttpPut]
    [Authorize]
    [Route("password")]
    public async Task<IActionResult> ChangePasssword(UpdatePasswordModel model)
    {
        await ValidatePassword(model.NewPassword, model.RepeatPassword);

        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        IdentityResult result;
        if (model.CurrentPassword == "ADMIN")
        {
            await _userManager.RemovePasswordAsync(user);
            result = await _userManager.AddPasswordAsync(user, model.NewPassword);
        }
        else
        {
            result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        }

        if (!result.Succeeded)
        {
            throw new MainException(ApiExceptionCodes.PasswordUpdateError, string.Join(", ", result.Errors));
        }

        return NoContent();
    }

    [HttpPut]
    [Authorize]
    [Route("user")]
    public async Task<IActionResult> UpdateUser(UpdateUserModel model)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        user.FullName = model.FullName;
        await _userManager.UpdateAsync(user);

        return NoContent();
    }

    [Authorize]
    [HttpGet]
    [Route("info")]
    public IActionResult Info()
    {
        var username = User?.Identity?.Name;

        return Ok(new
        {
            Username = username
        });
    }

    private JwtSecurityToken CreateToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

        var token = new JwtSecurityToken(
            expires: DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

        return token;
    }

    private string AccessToken => Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

    private static string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
        if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            throw new SecurityTokenException("Invalid token");

        return principal;

    }
}