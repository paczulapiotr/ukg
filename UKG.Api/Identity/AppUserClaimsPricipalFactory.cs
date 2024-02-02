using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using UKG.Auth;

namespace UKG.Api.Identity;

public class AppUserClaimsPricipalFactory : UserClaimsPrincipalFactory<AppUser, IdentityRole<int>>
{
    public AppUserClaimsPricipalFactory(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole<int>> roleManager,
        IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, roleManager, optionsAccessor)
    {
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(AppUser user)
    {
        var claimsIdentity = await base.GenerateClaimsAsync(user);

        // Add custom claims here
        var expirationDate = DateTime.Now.AddDays(14).ToString();
        claimsIdentity.AddClaim(new Claim(ClaimTypes.GivenName, user.FullName ?? user.UserName ?? string.Empty));
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Expiration, expirationDate));

        return claimsIdentity;
    }
}

