using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace UKG.Auth.Context
{
	public class AuthDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
	{
		public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
		{
		}

	}
}

