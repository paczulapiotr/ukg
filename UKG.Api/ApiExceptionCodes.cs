using System;
namespace UKG.Api;

public static class ApiExceptionCodes
{
    // Auth codes
    public const string UserAlreadyExists = "UserAlreadyExists";
    public const string PasswordsNotMatching = "PasswordsNotMatching";
    public const string PasswordsFormatIncorrect = "PasswordsFormatIncorrect";
    public const string UserCreationError = "UserCreationError";
    public const string PasswordUpdateError = "PasswordUpdateError";
}

