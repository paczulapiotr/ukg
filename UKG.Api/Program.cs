using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using UKG.Auth.Context;
using UKG.Backend.Mapper;
using UKG.Backend.Services;
using UKG.Storage.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UKG.Auth;
using UKG.Api;
using FluentValidation;
using System.Reflection;
using UKG.Backend.Validators;
using UKG.Api.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<ClaimsPrincipal>(sp => sp.GetRequiredService<IHttpContextAccessor>().HttpContext?.User!);
builder.Services.AddTransient<IUkgService, UkgService>();
builder.Services.AddTransient<IUkgRepository, UkgSqlRepository>();
builder.Services.AddTransient<IPatientRepository, PatientSqlRepository>();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddValidatorsFromAssemblies(new List<Assembly> { typeof(Program).Assembly, typeof(ValidationMessages).Assembly });
builder.Services.AddAutoMapper(c =>
{
    c.AddProfile(new MapperConfiguration());
    c.AddProfile(new ApiMapperConfiguration());
});

// Add controllers
builder.Services.AddControllers(opts =>
{
    opts.Filters.Add<MainExceptionFilter>();
    opts.Filters.Add<FluentValidationExceptionFilter>();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(builder => builder.WithOrigins("http://localhost:1320")
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

//builder.Services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AppUserClaimsPricipalFactory>();
builder.Services.AddIdentity<AppUser, IdentityRole<int>>(c =>
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


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opts =>
{
    opts.SaveToken = true;
    opts.RequireHttpsMetadata = false;
    opts.TokenValidationParameters = new()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"] ?? "")),
    };
});
builder.Services.AddAuthorization();

// Build
var app = builder.Build();

// Migrate the contexts
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var ukgDbContext = services.GetRequiredService<UkgDbContext>();
    var authDbContext = services.GetRequiredService<AuthDbContext>();
    ukgDbContext.Database.Migrate();
    authDbContext.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();

