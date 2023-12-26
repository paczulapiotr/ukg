using Microsoft.AspNetCore.Identity;

namespace UKG.Auth.Models
{
	public class AppUser : IdentityUser<int>
	{
		public string? FullName { get; set; }
	}
}

