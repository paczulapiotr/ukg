﻿using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace UKG.Api.Models;

public class LoginModel
{
    [Required]
    [Display(Name = "Username")]
    public string? UserName { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string? Password { get; set; }

    [Display(Name = "Remember me")]
    public bool RememberMe { get; set; }
}