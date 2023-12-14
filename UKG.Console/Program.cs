// See https://aka.ms/new-console-template for more information

using QuestPDF.Fluent;
using QuestPDF.Previewer;
using UKG.Backend.PDF;

Document
    .Create(PDFBuilder.DocumentBuilder())
    .ShowInPreviewer();
