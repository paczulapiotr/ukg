import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { UkgExamination } from "@/models";

const useAddUkg = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (ukg: UkgExamination) =>
      (await instance.post("/ukg", ukg)).data,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.ukgList] });
    },
  });
};

export default useAddUkg;
