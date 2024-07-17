import { ExamForm } from "@/components/ExamForm";
import { UkgExaminationForm } from "@/models";
import useAddUkg from "@/queries/useAddUkg";
import { useNavigate } from "react-router-dom";

type Props = { patientId: string; onCancel: () => void };

const AddForm = ({ patientId, onCancel }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync } = useAddUkg();

  const onFinish = async (values: UkgExaminationForm) => {
    const id = await mutateAsync({ ...values, PatientID: patientId });
    navigate(`/patient/${patientId}/ukg/${id}`);
  };

  return <ExamForm onCancel={onCancel} onFinish={onFinish} />;
};

export default AddForm;
