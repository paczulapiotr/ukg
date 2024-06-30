import { PatientFormModel } from "@/models";
import { Button, Flex, Form, Space, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useGetPatient from "@/queries/useGetPatient";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import PatientForm from "@/components/PatientForm/PatientForm";
import dayjs from "dayjs";
import LoadingPage from "@/pages/common/LoadingPage";
import NotFoundPage from "@/pages/common/NotFoundPage";
import useEditPatient from "@/queries/useEditPatient";

const Edit = () => {
  const [form] = Form.useForm<PatientFormModel>();
  const { patientId } = useParams<{ patientId: string }>();
  const { mutateAsync } = useEditPatient();
  const navigate = useNavigate();
  const { data: patient, isLoading } = useGetPatient(patientId);

  const onFinish = async (values: PatientFormModel) => {
    try {
      await mutateAsync({
        id: patientId!,
        firstName: values.firstName,
        lastName: values.lastName,
        pesel: values.pesel,
        birthday: values.birthdayDate,
      });
      message.success("Pomyślnie zapisano pacjenta");
      form.resetFields();
      navigate(`/patient/${patientId}`);
    } catch (err) {
      message.error("Wystąpił błąd podczas zapisywania pacjenta");
    }
  };

  if (isLoading) return <LoadingPage />;

  return !patient ? (
    <NotFoundPage />
  ) : (
    <Flex vertical gap={"1rem"} flex={1}>
      <PageTitle title={"Edytuj pacjenta"} returnTo={`/patient/${patientId}`} />
      <PatientForm
        form={form}
        onFinish={onFinish}
        patient={{ ...patient, birthdayDate: dayjs(patient?.birthday) }}
      />
      <Flex justify="flex-end" align="flex-end" flex={2}>
        <Space>
          <Button onClick={() => navigate(`/patient/${patientId}`)}>
            {"Anuluj"}
          </Button>
          <Button type="primary" onClick={form.submit}>
            {"Zapisz"}
          </Button>
        </Space>
      </Flex>
    </Flex>
  );
};

export default Edit;
