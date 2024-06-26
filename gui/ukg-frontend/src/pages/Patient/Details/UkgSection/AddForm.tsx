import { ExamForm } from "@/components/ExamForm";
import { UkgExaminationForm } from "@/models";
import useAddUkg from "@/queries/useAddUkg";

type Props = { id: string; onCancel: () => void };

const AddForm = ({ id, onCancel }: Props) => {
  const { mutateAsync } = useAddUkg();
  const onFinish = async (values: UkgExaminationForm) => {
    await mutateAsync({ ...values, PatientID: id });
  };

  return <ExamForm onCancel={onCancel} onFinish={onFinish} />;
};

export default AddForm;
