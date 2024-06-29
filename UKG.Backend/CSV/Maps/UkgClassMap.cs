
using CsvHelper.Configuration;
using UKG.Storage.Models;

public sealed class UkgSummaryClassMap : ClassMap<UkgSummary>
{
    public UkgSummaryClassMap()
    {
        Map(m => m.ID).Ignore();
        Map(m => m.SubmitterID).Ignore();
        Map(m => m.CreatedAt).Name("Data utworzenia").Index(0);
        Map(m => m.UpdatedAt).Name("Data modyfikacji").Index(1);
        Map(m => m.PatientID).Ignore();
        Map(m => m.Patient.FirstName).Name("Imię").Index(2);
        Map(m => m.Patient.LastName).Name("Nazwisko").Index(3);
        Map(m => m.Patient.Pesel).Name("Pesel").Index(4);
        Map(m => m.Patient.Birthday).Name("Data urodzenia").Index(5);
        Map(m => m.Ao).Name("Ao").Index(6);
        Map(m => m.ACS).Name("ACS").Index(7);
        Map(m => m.LA).Name("LA").Index(8);
        Map(m => m.RV).Name("RV").Index(9);
        Map(m => m.LVs).Name("LVs").Index(10);
        Map(m => m.LVd).Name("LVd").Index(11);
        Map(m => m.IVSs).Name("IVSs").Index(12);
        Map(m => m.IVSd).Name("IVSd").Index(13);
        Map(m => m.LVPWs).Name("LVPWs").Index(14);
        Map(m => m.LVPWd).Name("LVPWd").Index(15);
        Map(m => m.EF).Name("EF").Index(16);
        Map(m => m.Kurczliwosc).Name("Kurczliwosc").Index(17);
        Map(m => m.Osierdzie).Name("Osierdzie").Index(18);
        Map(m => m.ZastawkaMitralna).Name("ZastawkaMitralna").Index(19);
        Map(m => m.DopplerMitralna).Name("DopplerMitralna").Index(20);
        Map(m => m.VmaxMitralna).Name("VmaxMitralna").Index(21);
        Map(m => m.GmaxMitralna).Name("GmaxMitralna").Index(22);
        Map(m => m.ZastawkaAortalna).Name("ZastawkaAortalna").Index(23);
        Map(m => m.DopplerAortalna).Name("DopplerAortalna").Index(24);
        Map(m => m.VmaxAortalna).Name("VmaxAortalna").Index(25);
        Map(m => m.GmaxAortalna).Name("GmaxAortalna").Index(26);
        Map(m => m.ZastawkaTrojdzielna).Name("ZastawkaTrojdzielna").Index(27);
        Map(m => m.DopplerTrojdzielna).Name("DopplerTrojdzielna").Index(28);
        Map(m => m.VmaxTrojdzielna).Name("VmaxTrojdzielna").Index(29);
        Map(m => m.GmaxTrojdzielna).Name("GmaxTrojdzielna").Index(30);
        Map(m => m.ZastawkaPnia).Name("ZastawkaPnia").Index(31);
        Map(m => m.DopplerPnia).Name("DopplerPnia").Index(32);
        Map(m => m.Summary).Name("Podsumowanie").Index(33);
    }
}