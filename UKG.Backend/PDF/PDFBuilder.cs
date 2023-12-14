using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using UKG.Backend.Models;

namespace UKG.Backend.PDF;

public class PDFBuilder : IPDFBuilder
{
    public async Task<Stream> Create(UKGSummary ukgSummary)
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
        return container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));

                page.Header()
                    .Text("Hello PDF!")
                    .SemiBold().FontSize(36).FontColor(Colors.Blue.Medium);

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(20);
                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Image(Placeholders.Image(200, 100));
                    });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Page ");
                        x.CurrentPageNumber();
                    });
            });
        };
    }
}