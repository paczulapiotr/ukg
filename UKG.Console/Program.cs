// See https://aka.ms/new-console-template for more information

using QuestPDF.Fluent;
using QuestPDF.Previewer;
using UKG.Backend.PDF;

Document
    .Create(PDFBuilder.DocumentBuilder(new()
    {
        PESEL = "97042708474",
        FirstName = "Piotr",
        SecondName = "Paczuła",
        Birthday = DateOnly.Parse("1997-04-27"),
        CreatedAt = DateTime.Now,
        SubmitterName = "Wojciech Czapla"
    }))
    .ShowInPreviewer();

