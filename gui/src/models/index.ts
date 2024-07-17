import { Dayjs } from "dayjs";

export type UkgExaminationForm = {
  ao?: string | null;
  acs?: string | null;
  la?: string | null;
  rv?: string | null;
  lvs?: string | null;
  lvd?: string | null;
  ivss?: string | null;
  ivsd?: string | null;
  lvpws?: string | null;
  lvpwd?: string | null;
  ef?: string | null;
  kurczliwosc?: string | null;
  osierdzie?: string | null;
  zastawkaMitralna?: string | null;
  dopplerMitralna?: string | null;
  vmaxMitralna?: string | null;
  gmaxMitralna?: string | null;
  zastawkaAortalna?: string | null;
  dopplerAortalna?: string | null;
  vmaxAortalna?: string | null;
  gmaxAortalna?: string | null;
  zastawkaTrojdzielna?: string | null;
  dopplerTrojdzielna?: string | null;
  vmaxTrojdzielna?: string | null;
  gmaxTrojdzielna?: string | null;
  zastawkaPnia?: string | null;
  dopplerPnia?: string | null;
  summary?: string | null;
};

export type UkgExamination = UkgExaminationForm & { PatientID: string };
export type EditUkgExamination = UkgExaminationForm & { Id: string };

export type PatientFormModel = {
  id: string;
  pesel: string;
  firstName: string;
  lastName: string;
  birthdayDate: Dayjs;
  overridePesel?: boolean;
};
