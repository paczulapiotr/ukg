import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export type StatusModel = {
  version: string;
};

const useGetApiStatus = () => {
  return useQuery({
    queryFn: async () => (await instance.get<StatusModel>(`/status`)).data,
    queryKey: [queryKeys.apiStatus],
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retry: 5,
  });
};

export default useGetApiStatus;
