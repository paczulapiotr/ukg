import { Divider, Flex, Form, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import useGetPatient from "@/queries/useGetPatient";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import AddForm from "@/pages/Patient/Details/UkgSection/AddForm";
import { PatientFormModel } from "@/models";
import PatientForm from "@/components/PatientForm/PatientForm";
import LoadingPage from "@/pages/common/LoadingPage";

const Add = () => {
  const [form] = Form.useForm<PatientFormModel>();
  const { patientId } = useParams<{ patientId: string }>();
  const { data: patient, isLoading } = useGetPatient(patientId);
  const navigate = useNavigate();
  const patientForm: PatientFormModel | undefined =
    patient == null
      ? undefined
      : {
          birthdayDate: dayjs(patient.birthday),
          firstName: patient.firstName,
          lastName: patient.lastName,
          pesel: patient.pesel,
          id: patient.id,
        };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Flex vertical flex={1}>
      <Flex vertical gap={"1rem"}>
        <PageTitle title={"Dodaj badanie"} returnTo={`/patient/${patientId}`} />
        <PatientForm form={form} readonly patient={patientForm} />
      </Flex>
      <Divider />
      <AddForm
        patientId={patientId!}
        onCancel={() => navigate(`/patient/${patientId}`)}
      />
    </Flex>
  );
};

export default Add;
