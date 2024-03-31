// See https://aka.ms/new-console-template for more information

using QuestPDF.Fluent;
using QuestPDF.Previewer;
using UKG.Backend.PDF;

Document
    .Create(PDFBuilder.DocumentBuilder(new()
    {
        Pesel = "97042708474",
        FirstName = "Piotr",
        LastName = "Paczuła",
        Birthday = DateOnly.Parse("1997-04-27"),
        CreatedAt = DateTime.Now,
        SubmitterName = "Wojciech Czapla",
        ACS = "ACS",
        Ao = "AO",
        DopplerAortalna = "Doppler aortalna",
        DopplerMitralna = "Doppler mitralna",
        DopplerPnia = "Doppler pnia",
        DopplerTrojdzielna = "Doppler trójdzielna",
        EF = "EF",
        GmaxAortalna = "Gmax aortalna",
        GmaxMitralna = "Gmax mitralna",
        GmaxTrojdzielna = "Gmax trójdzielna",
        IVSd = "IVSd",
        IVSs = "IVSs",
        Kurczliwosc = "Kurczliwość",
        LA = "LA",
        LVd = "LVd",
        LVPWd = "LVPWd",
        LVPWs = "LVPWs",
        LVs = "LVs",
        Osierdzie = "Osierdzie",
        Summary = "Podsumowanie",
        UpdatedAt = DateTime.Now,
        VmaxAortalna = "Vmax aortalna",
        VmaxMitralna = "Vmax mitralna",
        VmaxTrojdzielna = "Vmax trójdzielna",
        ZastawkaMitralna = "Zastawka mitralna",
        ZastawkaPnia = "Zastawka pnia",
        ZastawkaTrojdzielna = "Zastawka trójdzielna",
        RV = "RV",
        ZastawkaAortalna = "Zastawka aortalna",
    }))
    .ShowInPreviewer();

