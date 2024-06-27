using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using UKG.Backend.Models;

namespace UKG.Backend.PDF;

public class PDFBuilder : IPDFBuilder
{
    private readonly static uint _fontSize = 11;
    private readonly static uint _cellPadding = 3;
    private readonly static uint _borderSize = 1;
    private readonly static uint _borderGap = 1;

    public async Task<Stream> Create(PatientSimple patient, UkgSummary ukgSummary)
    {
        return await Task.Run(() =>
        {
            var document = Document.Create(DocumentBuilder(patient, ukgSummary));

            document.WithSettings(new()
            {
                ImageCompressionQuality = ImageCompressionQuality.Best,
                ContentDirection = ContentDirection.LeftToRight
            });

            var stream = new MemoryStream();
            document.GeneratePdf(stream);
            return stream;
        });
    }
    public static Action<IDocumentContainer> DocumentBuilder(PatientSimple patient, UkgSummary ukg)
    {
        return container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(1, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(_fontSize));
                page.Content().Table(tableContainer =>
                {
                    tableContainer.ColumnsDefinition(cd =>
                    {
                        cd.RelativeColumn();
                    });

                    tableContainer.Header(h =>
                    {
                        h.Cell()
                        .ColumnSpan(1)
                        .Element(e => e.Border(_borderSize).Padding(_cellPadding).AlignCenter())
                        .Text("Badanie UKG").SemiBold();
                    });

                    tableContainer.Cell().Border(_borderSize).Padding(_borderGap).Table(table =>
                    {
                        table.ColumnsDefinition(cd =>
                        {
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                            cd.RelativeColumn();
                        });

                        table.Cell().ColumnSpan(4).Element(Cell).Text($"Przeprowadzone przez: {ukg.SubmitterName}");
                        table.Cell().ColumnSpan(4).Element(Cell).Text($"Data badania: {ukg.CreatedAt:dd-MM-yyyy HH:mm:ss}");

                        table.Cell().ColumnSpan(4).Element(Cell).Text($"PESEL: {patient.Pesel}");
                        table.Cell().ColumnSpan(4).Element(Cell).Text($"Data urodzenia: {patient.Birthday:dd-MM-yyyy}, wiek: {CalculateAge(patient.Birthday, ukg.CreatedAt)}");

                        Field(table, "Imię i nazwisko", patient.FullName);

                        SmallField(table, 2, "Ao:", ukg.Ao);
                        SmallField(table, 6, "ACS:", ukg.Acs);

                        SmallField(table, 2, "LA:", ukg.La);
                        SmallField(table, 6, "RV:", ukg.Rv);

                        SmallField(table, 2, "LVs:", ukg.Lvs);
                        SmallField(table, 6, "LVd:", ukg.Lvd);

                        SmallField(table, 2, "IVSs:", ukg.Ivss);
                        SmallField(table, 6, "IVSd:", ukg.Ivsd);

                        SmallField(table, 2, "LVPWs:", ukg.Lvpws);
                        SmallField(table, 6, "LVPWd:", ukg.Lvpwd);

                        Field(table, "EF:", ukg.Ef);
                        Field(table, "Kurczliwość:", ukg.Kurczliwosc);
                        Field(table, "Osierdzie:", ukg.Osierdzie);
                        Field(table, "Zastawka mitralna:", ukg.ZastawkaMitralna);
                        Field(table, "Badanie dopplerowskie:", ukg.DopplerMitralna);
                        SmallField(table, 2, "Vmax:", ukg.VmaxMitralna);
                        SmallField(table, 6, "Gmax:", ukg.GmaxMitralna);

                        Field(table, "Zastawka aotralna:", ukg.ZastawkaAortalna);
                        Field(table, "Badanie dopplerowskie:", ukg.DopplerAortalna);
                        SmallField(table, 2, "Vmax:", ukg.VmaxAortalna);
                        SmallField(table, 6, "Gmax:", ukg.GmaxAortalna);

                        Field(table, "Zastawka trójdzielna:", ukg.ZastawkaTrojdzielna);
                        Field(table, "Badanie dopplerowskie:", ukg.DopplerTrojdzielna);
                        SmallField(table, 2, "Vmax:", ukg.VmaxTrojdzielna);
                        SmallField(table, 6, "Gmax:", ukg.GmaxTrojdzielna);

                        Field(table, "Zastawka pnia płucnego:", ukg.ZastawkaPnia);
                        Field(table, "Badanie dopplerowskie:", ukg.DopplerPnia);
                        Field(table, "Wnioski:", ukg.Summary);
                    });
                });

                page.Footer()
                    .AlignLeft()
                    .Text(x =>
                    {
                        x.CurrentPageNumber();
                        x.Span(" z ");
                        x.TotalPages();
                    });
            });
        };
    }


    static IContainer Cell(IContainer container)
    {
        return container
             .Padding(_borderGap)
             .Border(_borderSize)
             .Background(Colors.Grey.Lighten5)
             .Padding(_cellPadding)
             .ShowOnce()
             .AlignLeft()
             .AlignMiddle();
    }

    static IContainer BorderlessCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten5)
            .PaddingLeft(_cellPadding)
            .ShowOnce()
            .AlignLeft()
            .AlignMiddle();
    }

    static void SmallField(TableDescriptor table, uint span, string? cellOne, string? cellTwo)
    {
        table.Cell().ColumnSpan(span).Padding(_borderGap).Border(_borderSize).Table(t =>
        {
            t.ColumnsDefinition(cd =>
            {
                for (int i = 0; i < span; i++)
                    cd.RelativeColumn();
            });

            t.Cell().ColumnSpan(1).Element(BorderlessCell).Text(cellOne);
            t.Cell().ColumnSpan(1).Element(BorderlessCell).Text(cellTwo);
        });
    }

    static void Field(TableDescriptor table, string? cellOne, string? cellTwo)
    {
        table.Cell().ColumnSpan(2).Element(Cell).Text(cellOne);
        table.Cell().ColumnSpan(6).Element(Cell).Text(cellTwo);
    }

    static int CalculateAge(DateOnly birthday, DateTime today)
    {
        int age = today.Year - birthday.Year;

        if (today.DayOfYear < birthday.DayOfYear)
            age--;

        return age;
    }
}