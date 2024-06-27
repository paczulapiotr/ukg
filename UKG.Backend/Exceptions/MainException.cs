namespace UKG.Backend.Exceptions;

public class MainException : Exception
{
    public MainException(Exception ex, string message) : base(message, ex)
    {
        ExceptionCode = MainExceptionMessages.Default;
    }

    public MainException(Exception ex, string exceptionCode, string message) : base(message, ex)
    {
        ExceptionCode = exceptionCode;
    }

    public MainException(string message) : base(message)
    {
        ExceptionCode = MainExceptionMessages.Default;
    }

    public MainException(string exceptionCode, string message): base(message)
    {
        ExceptionCode = exceptionCode;
    }

    public string ExceptionCode { get; }
}

