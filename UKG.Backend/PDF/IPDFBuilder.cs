using UKG.Backend.Models;

namespace UKG.Backend.PDF;

public interface IPDFBuilder
{
    Task<byte[]> Create(PatientSimple patient, UkgSummary ukgSummary, CancellationToken cancellationToken = default);
}
