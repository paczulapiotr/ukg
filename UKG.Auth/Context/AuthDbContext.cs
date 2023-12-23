using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using UKG.Auth.Models;

namespace UKG.Auth.Context
{
	public class AuthDbContext : IdentityDbContext<AppUser>
	{
		public AuthDbContext(DbContextOptions options): base(options)
		{
		}

	}
}

