import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { TableData } from "./types";

export type UkgListItem = {
  ID?: number;
  SubmitterID?: number;
  SubmitterName?: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  PESEL: string;
  FirstName: string;
  SecondName: string;
  FullName: string;
  Birthday: Date;
};

const useGetUkgList = (page: number, pageSize: number, pesel?: string) => {
  return useQuery({
    queryFn: async () =>
      (
        await instance.get<TableData<UkgListItem>>(
          `/ukg?pageSize=${pageSize}&page=${page}&pesel=${pesel ?? ""}`
        )
      ).data,
    initialData: { data: [], total: 0 },
    queryKey: [queryKeys.ukgList, page, pageSize, pesel],
  });
};

export default useGetUkgList;
