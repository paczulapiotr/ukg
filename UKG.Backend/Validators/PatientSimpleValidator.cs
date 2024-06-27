using FluentValidation;
using Microsoft.EntityFrameworkCore;
using UKG.Backend.Models;
using UKG.Storage.Repositories;

namespace UKG.Backend.Validators;

public class PatientSimpleValidator : AbstractValidator<PatientSimple>
{
    private readonly IPatientRepository _patientRepository;

	public PatientSimpleValidator(IPatientRepository patientRepository)
	{
        _patientRepository = patientRepository;

        RuleFor(x => x.Pesel).Must(ValidatePeselFormat).WithErrorCode(ValidationMessages.PeselFormatErrorCode);
        RuleFor(x => x.Pesel).MustAsync(ValidatePeselUniqueness).WithErrorCode(ValidationMessages.PeselUniquenessErrorCode);
    }


    private static bool ValidatePeselFormat(string pesel)
    {
        if (pesel.Length != 11) return false;

        int[] weights = { 1, 3, 7, 9, 1, 3, 7, 9, 1, 3 };
        int sum = 0;

        for (int i = 0; i < 10; i++)
        {
            if (!int.TryParse(pesel[i].ToString(), out int digit))
            {
                return false; // Non-numeric character found
            }
            sum += digit * weights[i];
        }

        int calculatedCheckDigit = (10 - (sum % 10)) % 10;

        if (!int.TryParse(pesel[10].ToString(), out int lastDigit))
        {
            return false; // Last character is not a digit
        }

        return calculatedCheckDigit == lastDigit;
    }

    private async Task<bool> ValidatePeselUniqueness(PatientSimple record, string pesel, CancellationToken cancellationToken)
    {
        var isUnique = !await _patientRepository.Query().AnyAsync(x => x.Pesel == pesel && x.ID != record.Id, cancellationToken);

        return isUnique;
    }

}

