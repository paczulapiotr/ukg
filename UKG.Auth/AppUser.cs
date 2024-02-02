using Microsoft.AspNetCore.Identity;

namespace UKG.Auth
{
	public class AppUser : IdentityUser<int>
	{
		public string? FullName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}

