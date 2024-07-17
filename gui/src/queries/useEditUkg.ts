import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { EditUkgExamination } from "@/models";

const useEditUkg = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (ukg: EditUkgExamination) =>
      (await instance.put(`/ukg/${ukg.Id}`, ukg)).data,
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: [queryKeys.ukgList] });
      client.invalidateQueries({ queryKey: [queryKeys.ukg, variables.Id] });
    },
  });
};

export default useEditUkg;
