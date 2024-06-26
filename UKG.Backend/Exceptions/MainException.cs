namespace UKG.Backend.Exceptions;

	public class MainException : Exception
	{
		public MainException(string exceptionCode, string? message = null): base(message)
		{
        ExceptionCode = exceptionCode;
    }

    public string ExceptionCode { get; }
}

