using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UKG.Auth.Context;
using UKG.Auth.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<UkgDbContext>(opts
    => opts.UseSqlite(dbConnectionString));

// Add authentication
builder.Services.AddDbContext<AuthDbContext>(opts
    => opts.UseSqlite(dbConnectionString));

builder.Services.AddIdentity<AppUser, IdentityRole>(c =>
{
    c.SignIn.RequireConfirmedEmail = false;
    c.SignIn.RequireConfirmedPhoneNumber = false;
    c.SignIn.RequireConfirmedAccount = false;
    c.Password.RequireDigit = false;
    c.Password.RequiredUniqueChars = 0;
    c.Password.RequireNonAlphanumeric = false;
    c.Password.RequireUppercase = false;

})
    .AddEntityFrameworkStores<AuthDbContext>();

builder.Services.AddAuthorization();

// Build
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

