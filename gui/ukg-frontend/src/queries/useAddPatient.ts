import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { Dayjs } from "dayjs";

export type AddPatientModel = {
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: Dayjs;
};

const useAddPatient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (model: AddPatientModel) =>
      (
        await instance.post("/patient", {
          ...model,
          birthday: model.birthday.format("YYYY-MM-DD"),
        })
      ).data,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.patientList] });
    },
  });
};

export default useAddPatient;
