import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export type UkgSummary = {
  id?: number;
  patientId?: number;
  submitterId?: number;
  submitterName?: string;
  createdAt: string;
  updatedAt?: string;
  ao?: string;
  acs?: string;
  la?: string;
  rv?: string;
  lVs?: string;
  lVd?: string;
  iVSs?: string;
  iVSd?: string;
  lVPWs?: string;
  lVPWd?: string;
  ef?: string;
  kurczliwosc?: string;
  osierdzie?: string;
  zastawkaMitralna?: string;
  dopplerMitralna?: string;
  vmaxMitralna?: string;
  gmaxMitralna?: string;
  zastawkaAortalna?: string;
  dopplerAortalna?: string;
  vmaxAortalna?: string;
  gmaxAortalna?: string;
  zastawkaTrojdzielna?: string;
  dopplerTrojdzielna?: string;
  vmaxTrojdzielna?: string;
  gmaxTrojdzielna?: string;
  zastawkaPnia?: string;
  dopplerPnia?: string;
  summary?: string;
};

const useGetUkg = (id?: string) => {
  return useQuery({
    queryFn: async () => (await instance.get<UkgSummary>(`/ukg/${id}`)).data,
    enabled: id != null,
    queryKey: [queryKeys.ukg, id],
  });
};

export default useGetUkg;
