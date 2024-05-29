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
    }
}

