import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { TableData } from "./types";

export type UkgListItem = {
  id?: number;
  created: string;
  updated?: string;
  summary?: string;
};

const useGetUkgList = (page: number, pageSize: number, patientId?: string) => {
  return useQuery({
    queryFn: async () =>
      (
        await instance.get<TableData<UkgListItem>>(
          `/ukg/list/${patientId}?pageSize=${pageSize}&page=${page}`
        )
      ).data,
    initialData: { data: [], total: 0 },
    enabled: patientId != null,
    queryKey: [queryKeys.ukgList, page, pageSize, patientId],
  });
};

export default useGetUkgList;
