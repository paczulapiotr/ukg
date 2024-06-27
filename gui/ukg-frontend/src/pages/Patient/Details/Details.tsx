import { PatientFormModel } from "@/models";
import { Button, Divider, Flex, Form, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import useGetPatient from "@/queries/useGetPatient";
import UkgSection from "./UkgSection/UkgSection";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import { EditOutlined } from "@ant-design/icons";
import PatientForm from "@/components/PatientForm/PatientForm";
import LoadingPage from "@/pages/common/LoadingPage";

const Details = () => {
  const [form] = Form.useForm<PatientFormModel>();
  const { patientId } = useParams<{ patientId: string }>();
  const { data: patient, isFetching } = useGetPatient(patientId);
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

  return isFetching ? (
    <LoadingPage />
  ) : (
    <Flex vertical flex={1}>
      <>
        <Flex vertical gap={"1rem"}>
          <Flex justify="space-between">
            <PageTitle title={"Szczegóły pacjenta"} returnTo={`/patient`} />
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/patient/${patientId}/edit`)}
            >
              {"Edytuj"}
            </Button>
          </Flex>
          <PatientForm readonly form={form} patient={patientForm} />
        </Flex>
        <Divider />
        <UkgSection patientId={patientId!} />
      </>
    </Flex>
  );
};

export default Details;
