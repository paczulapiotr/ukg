using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UKG.Storage.Models;

namespace UKG.Storage.Configuration;

public class PatientEntityConfiguration : IEntityTypeConfiguration<Patient>
{
    public PatientEntityConfiguration()
    {
    }

    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.HasKey(x => x.ID);
        builder.HasMany(x => x.Ukgs).WithOne(x => x.Patient).HasForeignKey(x => x.PatientID);
        builder
           .Property(x => x.FullName)
           .HasComputedColumnSql($"{nameof(Patient.FirstName)} || ' ' || {nameof(Patient.LastName)}");
    }
}

