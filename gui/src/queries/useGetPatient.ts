import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: string;
};

const useGetPatient = (id?: string) => {
  return useQuery({
    queryFn: async () => (await instance.get<Patient>(`/patient/${id}`)).data,
    enabled: id != null,
    queryKey: [queryKeys.patient, id],
  });
};

export default useGetPatient;
