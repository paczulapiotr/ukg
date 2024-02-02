using System.ComponentModel.DataAnnotations;

namespace UKG.Api.Models.Auth;

public record LoginModel
{
    [Required(ErrorMessage = "Userbame is required")]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}

