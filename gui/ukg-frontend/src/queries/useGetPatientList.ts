import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { TableData } from "./types";

export type PatientListItem = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: string;
};

const useGetPatientList = (page: number, pageSize: number, search?: string) => {
  const params = new URLSearchParams();
  params.append("pageSize", pageSize.toString());
  params.append("page", page.toString());

  if (search != null) {
    params.append("search", search);
  }

  return useQuery({
    queryFn: async () =>
      (
        await instance.get<TableData<PatientListItem>>(
          `/patient/list?${params.toString()}`
        )
      ).data,
    initialData: { data: [], total: 0 },
    queryKey: [queryKeys.patientList, page, pageSize, search],
  });
};

export default useGetPatientList;
