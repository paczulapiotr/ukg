import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { Dayjs } from "dayjs";

export type EditPatientModel = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: Dayjs;
  overridePesel?: boolean;
};

const useEditPatient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (model: EditPatientModel) =>
      (
        await instance.put(`/patient/${model.id}`, {
          firstName: model.firstName.trim(),
          lastName: model.lastName.trim(),
          pesel: model.pesel.trim(),
          birthday: model.birthday.format("YYYY-MM-DD"),
          overridePesel: model.overridePesel,
        })
      ).data,
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: [queryKeys.patientList] });
      client.invalidateQueries({ queryKey: [queryKeys.patient, variables.id] });
    },
  });
};

export default useEditPatient;
