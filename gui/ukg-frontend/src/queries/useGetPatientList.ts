import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { TableData } from "./types";

export type UkgPatientItem = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: string;
};

const useGetUkgList = (page: number, pageSize: number, pesel?: string) => {
  return useQuery({
    queryFn: async () =>
      (
        await instance.get<TableData<UkgPatientItem>>(
          `/patient/list?pageSize=${pageSize}&page=${page}`
        )
      ).data,
    initialData: { data: [], total: 0 },
    // enabled: pesel != null,
    queryKey: [queryKeys.patientList, page, pageSize, pesel],
  });
};

export default useGetUkgList;
