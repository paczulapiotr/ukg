using System.ComponentModel.DataAnnotations;

namespace UKG.Api.Models.Auth;

public record RegisterModel
{
    [Required(ErrorMessage = "FullName is required")]
    public string? FullName { get; set; }

    [Required(ErrorMessage = "Username is required")]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }

    [Required(ErrorMessage = "RepeatPassword is required")]
    public string? RepeatPassword { get; set; }
}

