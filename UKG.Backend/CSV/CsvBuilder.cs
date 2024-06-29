
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;

namespace UKG.Backend.CSV;

public class CsvBuilder : ICsvBuilder
{
    private const int BatchSize = 1000;

    public async Task<byte[]> CreateCsv<T>(IQueryable<T> records, ClassMap classMap) where T : class
    {
        using var memoryStream = new MemoryStream();
        using var streamWriter = new StreamWriter(memoryStream, new UTF8Encoding(true));
        using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

        csvWriter.Context.RegisterClassMap(classMap);

        int totalRecords = records.Count();
        int batches = (int)Math.Ceiling((double)totalRecords / BatchSize);

        for (int i = 0; i < batches; i++)
        {
            var batchRecords = records.Skip(i * BatchSize).Take(BatchSize).ToList();
            await csvWriter.WriteRecordsAsync(batchRecords);

            // Flush the writer to write the current batch to the stream
            await csvWriter.FlushAsync();
        }

        return memoryStream.ToArray();
    }
}