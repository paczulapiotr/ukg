import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import instance from "@/services/api";
import { Dayjs } from "dayjs";

export type AddPatientModel = {
  firstName: string;
  lastName: string;
  pesel: string;
  birthday: Dayjs;
  overridePesel?: boolean;
};

const useAddPatient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (model: AddPatientModel) =>
      (
        await instance.post("/patient", {
          firstName: model.firstName.trim(),
          lastName: model.lastName.trim(),
          pesel: model.pesel.trim(),
          birthday: model.birthday.format("YYYY-MM-DD"),
          overridePesel: model.overridePesel,
        })
      ).data,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKeys.patientList] });
    },
  });
};

export default useAddPatient;
