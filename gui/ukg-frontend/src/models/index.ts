import { Dayjs } from "dayjs";
export type UkgExamination = {
  ID?: string;
  Pesel: string;
  FirstName: string;
  LastName: string;
  Birthday?: string;
  Ao?: string | null;
  ACS?: string | null;
  LA?: string | null;
  RV?: string | null;
  LVs?: string | null;
  LVd?: string | null;
  IVSs?: string | null;
  IVSd?: string | null;
  LVPWs?: string | null;
  LVPWd?: string | null;
  EF?: string | null;
  Kurczliwosc?: string | null;
  Osierdzie?: string | null;
  ZastawkaMitralna?: string | null;
  DopplerMitralna?: string | null;
  VmaxMitralna?: string | null;
  GmaxMitralna?: string | null;
  ZastawkaAortalna?: string | null;
  DopplerAortalna?: string | null;
  VmaxAortalna?: string | null;
  GmaxAortalna?: string | null;
  ZastawkaTrojdzielna?: string | null;
  DopplerTrojdzielna?: string | null;
  VmaxTrojdzielna?: string | null;
  GmaxTrojdzielna?: string | null;
  ZastawkaPnia?: string | null;
  DopplerPnia?: string | null;
  Summary?: string | null;
};

export type PatientForm = {
  ID?: string;
  Pesel: string;
  FirstName: string;
  LastName: string;
  BirthdayDate: Dayjs;
};

export type UkgExaminationForm = UkgExamination & PatientForm;
