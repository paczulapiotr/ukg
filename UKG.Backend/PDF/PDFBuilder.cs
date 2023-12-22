using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Drawing.Exceptions;
using QuestPDF.Elements;
using UKG.Backend.Models;

namespace UKG.Backend.PDF;

public class PDFBuilder : IPDFBuilder
{
    public async Task<Stream> Create(UkgSummary ukgSummary)
    {
        return await Task.Run(() =>
        {
            var document = Document.Create(DocumentBuilder());

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
    public static Action<IDocumentContainer> DocumentBuilder()
    {
        const int cellPadding = 5;
        const int borderSize = 1;

        return container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(1, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(11));
                page.Content().Table(table =>
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

                    table.Header(h =>
                    {
                        h.Cell()
                        .ColumnSpan(8)
                        .Element(e => e.Border(borderSize).Padding(cellPadding).AlignCenter())
                        .Text("Badanie UKG").SemiBold();
                    });

                    table.Cell().ColumnSpan(4).Element(Cell).Text("Przeprowadzone przez: dr n.med. Wojciech Czapla");
                    table.Cell().ColumnSpan(4).Element(Cell).Text($"Data badania: {DateTime.Now:dd-MM-yyyy HH:mm:ss}");

                    table.Cell().ColumnSpan(4).Element(Cell).Text("PESEL: 97042708474");
                    table.Cell().ColumnSpan(4).Element(Cell).Text("Data urodzenia: 27-04-1997, wiek: 26");

                    Field(table, "Imię i nazwisko", "Piotr Paczuła");

                    SmallField(table, 2, "Ao:", "36");
                    SmallField(table, 6, "ACS:", "36");

                    SmallField(table, 2, "LA:", "36");
                    SmallField(table, 6, "RV:", "36");

                    SmallField(table, 2, "LVs:", "36");
                    SmallField(table, 6, "LVd:", "36");

                    SmallField(table, 2, "IVSs:", "36");
                    SmallField(table, 6, "IVSd:", "36");

                    SmallField(table, 2, "LVPWs:", "36");
                    SmallField(table, 6, "LVPWd:", "36");

                    Field(table, "EF:", "ok: 60%");
                    Field(table, "Kurczliwosc:", "lorem ipsum");
                    Field(table, "Osierdzie:", "lorem ipsum");
                    Field(table, "Zastawka mitralna:", "lorem ipsum");
                    Field(table, "Badanie dopplerowskie:", "lorem ipsum");
                    SmallField(table, 2, "Vmax:", "36");
                    SmallField(table, 6, "Gmax:", "36");

                    Field(table, "Zastawka aotralna:", "lorem ipsum");
                    Field(table, "Badanie dopplerowskie:", "lorem ipsum");
                    SmallField(table, 2, "Vmax:", "36");
                    SmallField(table, 6, "Gmax:", "36");

                    Field(table, "Zastawka trójdzielna:", "lorem ipsum");
                    Field(table, "Badanie dopplerowskie:", "lorem ipsum");
                    SmallField(table, 2, "Vmax:", "36");
                    SmallField(table, 6, "Gmax:", "36");

                    Field(table, "Zastawka pnia płucnego:", "lorem ipsum");
                    Field(table, "Badanie dopplerowskie:", "lorem ipsum");
                    Field(table, "Wnioski:", "Vestibulum convallis, enim vitae maximus congue, justo neque dapibus nulla, eu tempor nunc enim ut leo. In cursus felis egestas, cursus risus non, tempor mi. Praesent ut dapibus augue. Pellentesque vitae lectus nec leo mattis condimentum. \n\nSuspendisse vitae libero at libero ornare elementum. Morbi sit amet erat tincidunt, ultrices enim dictum, placerat orci. \n\n Aliquam volutpat placerat leo pharetra gravida. Proin eget faucibus ligula. Sed pulvinar mauris in molestie bibendum. Curabitur sed sem a erat ornare lacinia. Pellentesque porta, purus in varius porttitor, diam odio vulputate justo, nec congue metus tortor at nulla. Aliquam dictum nisl ut mi posuere dictum eu egestas odio.");
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
             .Border(1)
             .Background(Colors.Grey.Lighten5)
             .Padding(5)
             .ShowOnce()
             .AlignLeft()
             .AlignMiddle();
    }

    static IContainer BorderlessCell(IContainer container)
    {
        return container
            .Background(Colors.Grey.Lighten5)
            .PaddingLeft(5)
            .ShowOnce()
            .AlignLeft()
            .AlignMiddle();
    }

    static void SmallField(TableDescriptor table, uint span, string cellOne, string cellTwo)
    {
        table.Cell().ColumnSpan(span).Border(1).Table(t =>
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

    static void Field(TableDescriptor table, string cellOne, string cellTwo)
    {
        table.Cell().ColumnSpan(2).Element(Cell).Text(cellOne);
        table.Cell().ColumnSpan(6).Element(Cell).Text(cellTwo);
    }
}