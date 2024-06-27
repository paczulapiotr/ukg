using Microsoft.EntityFrameworkCore;
using UKG.Storage.Models;

namespace UKG.Storage.Repositories
{
    public class PatientSqlRepository : IPatientRepository
    {
        private readonly UkgDbContext _ctx;

        public PatientSqlRepository(UkgDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task Add(Patient patient, CancellationToken cancellationToken = default)
        {
            await _ctx.AddAsync(patient, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
        }

        public async Task Delete(int id, CancellationToken cancellationToken)
        {
            var patient = await _ctx.Patients.FindAsync(id, cancellationToken);

            if (patient is null) throw new InvalidOperationException("Patient not found");

            _ctx.Patients.Remove(patient);
            await _ctx.SaveChangesAsync(cancellationToken);
        }

        public Task<Patient?> FindOneByID(int id, int submitterId, CancellationToken cancellationToken = default)
        {
            return _ctx.Patients.AsNoTracking()
                           .Where(x => x.SubmitterID == submitterId)
                           .FirstOrDefaultAsync(x => x.ID == id, cancellationToken);
        }

        public IQueryable<Patient> Query()
        {
            return _ctx.Patients.AsNoTracking();
        }

        public async Task Update(int patientId, Patient patient, CancellationToken cancellationToken = default)
        {
            var toUpdate = await _ctx.Patients.FirstAsync(x => x.ID == patientId && x.SubmitterID == patient.SubmitterID, cancellationToken);

            if (toUpdate is null) throw new InvalidOperationException($"Could not find patient with id ${patientId}");

            toUpdate.FirstName = patient.FirstName;
            toUpdate.LastName = patient.LastName;
            toUpdate.Pesel = patient.Pesel;
            toUpdate.Birthday = patient.Birthday;

            _ctx.Update(toUpdate);
            await _ctx.SaveChangesAsync(cancellationToken);
        }
    }
}

