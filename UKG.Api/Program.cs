﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UKG.Api.Identity;
using UKG.Auth.Context;
using UKG.Auth.Models;
using UKG.Backend.Mapper;
using UKG.Backend.Services;
using UKG.Storage.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IUkgService, UkgService>();
builder.Services.AddTransient<IUkgRepository, UkgSqlRepository>();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddAutoMapper(c => c.AddProfile(new MapperConfiguration()));

// Add controllers
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(builder => builder.WithOrigins("http://localhost:1420")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
});
var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<UkgDbContext>(opts
    => opts.UseSqlite(dbConnectionString));

// Add authentication
builder.Services.AddDbContext<AuthDbContext>(opts
    => opts.UseSqlite(dbConnectionString));

builder.Services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AppUserClaimsPricipalFactory>();
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
app.UseCors();

app.MapControllers();

app.Run();

