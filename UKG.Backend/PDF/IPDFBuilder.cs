using UKG.Backend.Models;

namespace UKG.Backend.PDF;

public interface IPDFBuilder
{
    Task<Stream> Create(PatientSimple patient, UkgSummary ukgSummary);
}
