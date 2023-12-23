using Microsoft.AspNetCore.Identity;

namespace UKG.Auth.Models
{
	public class AppUser : IdentityUser
	{
		public string? FullName { get; set; }
	}
}

