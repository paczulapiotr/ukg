using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UKG.Storage.Models;

namespace UKG.Storage.Configuration;

internal class UKGSummaryEntityConfiguration : IEntityTypeConfiguration<UKGSummary>
{
    public void Configure(EntityTypeBuilder<UKGSummary> builder)
    {
        builder
            .Property(x => x.FullName)
            .HasComputedColumnSql($"{nameof(UKGSummary.FirstName)} || ' ' || {nameof(UKGSummary.LastName)}");
    }
}
