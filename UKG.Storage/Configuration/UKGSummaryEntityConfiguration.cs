using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UKG.Storage.Models;

namespace UKG.Storage.Configuration;

internal class UkgSummaryEntityConfiguration : IEntityTypeConfiguration<UkgSummary>
{
    public void Configure(EntityTypeBuilder<UkgSummary> builder)
    {
        builder.HasKey(x => x.ID);
    }
}
