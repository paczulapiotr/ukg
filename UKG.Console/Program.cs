// See https://aka.ms/new-console-template for more information

// using QuestPDF.Fluent;
// using QuestPDF.Previewer;
// using UKG.Backend.PDF;

// Document
//     .Create(PDFBuilder.DocumentBuilder())
//     .ShowInPreviewer();


using Microsoft.EntityFrameworkCore;
using UKG.Storage.Context;

using var ctx = new UkgDbContextFactory().CreateDbContext();
var pending = await ctx.Database.GetPendingMigrationsAsync();

if (pending is not null && pending.Any())
{
    await ctx.Database.MigrateAsync();
}