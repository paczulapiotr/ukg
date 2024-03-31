namespace UKG.Backend.Models;

public record TableData<TData>(int Total, IEnumerable<TData> Data)
{
}

