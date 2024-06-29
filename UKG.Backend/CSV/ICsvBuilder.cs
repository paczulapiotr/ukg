using CsvHelper.Configuration;

namespace UKG.Backend.CSV;

public interface ICsvBuilder
{
    Task<byte[]> CreateCsv<T>(IQueryable<T> records, ClassMap classMap) where T : class;
}
