// See https://aka.ms/new-console-template for more information

using QuestPDF.Fluent;
using QuestPDF.Previewer;
using UKG.Backend.PDF;

Document
    .Create(PDFBuilder.DocumentBuilder(
        new()
        {
            Id = 1,
            Pesel = "97042708474",
            FirstName = "Piotr",
            LastName = "Paczuła",
            Birthday = DateOnly.Parse("1997-04-27"),
        },
        new()
        {

            CreatedAt = DateTime.Now,
            SubmitterName = "Wojciech Czapla",
            Acs  = "ACS",
            Ao = "AO",
            DopplerAortalna = "Doppler aortalna",
            DopplerMitralna = "Doppler mitralna",
            DopplerPnia = "Doppler pnia",
            DopplerTrojdzielna = "Doppler trójdzielna",
            Ef = "EF",
            GmaxAortalna = "Gmax aortalna",
            GmaxMitralna = "Gmax mitralna",
            GmaxTrojdzielna = "Gmax trójdzielna",
            Ivsd = "IVSd",
            Ivss = "IVSs",
            Kurczliwosc = "Kurczliwość",
            La = "LA",
            Lvd = "LVd",
            Lvpwd = "LVPWd",
            Lvpws = "LVPWs",
            Lvs = "LVs",
            Osierdzie = "Osierdzie",
            Summary = "Podsumowanie",
            UpdatedAt = DateTime.Now,
            VmaxAortalna = "1.3 m/s",
            VmaxMitralna = "Vmax mitralna",
            VmaxTrojdzielna = "Vmax trójdzielna",
            ZastawkaMitralna = "Zastawka mitralna",
            ZastawkaPnia = "Zastawka pnia",
            ZastawkaTrojdzielna = "Zastawka trójdzielna",
            Rv = "RV",
            ZastawkaAortalna = "Zastawka aortalna",
        }))
    .ShowInPreviewer();

