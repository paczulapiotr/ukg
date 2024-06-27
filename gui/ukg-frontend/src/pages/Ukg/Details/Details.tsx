import { ExamForm } from "@/components/ExamForm";
import PatientForm from "@/components/PatientForm/PatientForm";
import Container from "@/components/common/Container";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import TextInput from "@/components/common/TextInput";
import { UkgExaminationForm } from "@/models";
import LoadingPage from "@/pages/common/LoadingPage";
import NotFoundPage from "@/pages/common/NotFoundPage";
import useEditUkg from "@/queries/useEditUkg";
import useGetPatient from "@/queries/useGetPatient";
import useGetUkg from "@/queries/useGetUkg";
import { formatDateTime } from "@/utility/date";
import { Button, Flex, Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilePdfOutlined } from "@ant-design/icons";
import { DownloadButton } from "@/components/common/DownloadButton";

const Details = () => {
  const [form] = Form.useForm();
  const [datesForm] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const { patientId, ukgId } = useParams<{
    patientId: string;
    ukgId: string;
  }>();
  const { data, isLoading } = useGetUkg(ukgId);
  const { data: patient, isLoading: isLoadingPatient } =
    useGetPatient(patientId);
  const navigate = useNavigate();
  const { mutateAsync } = useEditUkg();

  const onCancel = () => {
    if (edit) {
      setEdit(false);
    } else {
      navigate(`/patient/${patientId}`);
    }
  };

  const onFinish = async (values: UkgExaminationForm) => {
    await mutateAsync({
      ...values,
      Id: ukgId!,
    });
    setEdit(false);
  };

  useEffect(() => {
    if (data?.updatedAt) {
      form.resetFields();
      datesForm.resetFields();
    }
  }, [data?.updatedAt]);

  if (isLoadingPatient) {
    return <LoadingPage />;
  }

  if (!isLoading && !isLoadingPatient && (patient == null || data == null)) {
    return <NotFoundPage />;
  }

  return (
    <Flex vertical gap={"1rem"}>
      <Flex justify="space-between">
        <PageTitle
          title={"Szczegóły badania"}
          returnTo={`/patient/${patientId}`}
        />
        {isLoading ? null : (
          <DownloadButton
            icon={<FilePdfOutlined />}
            url={`/ukg/pdf/${data?.id}`}
            fileName={`Badanie_UKG_${data?.createdAt}`}
          >
            {"Pobierz PDF"}
          </DownloadButton>
        )}
      </Flex>
      <PatientForm
        readonly
        form={form}
        patient={{ ...patient!, birthdayDate: dayjs(patient!.birthday) }}
      />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Form
            disabled
            className="readonly-form"
            form={datesForm}
            initialValues={{
              created: data?.createdAt
                ? formatDateTime(dayjs(data!.createdAt))
                : "-",
              updated: data?.updatedAt
                ? formatDateTime(dayjs(data!.updatedAt))
                : "-",
            }}
          >
            <Container readonly name={"dates"}>
              <TextInput readonly name="created" />
              <TextInput readonly name="updated" />
            </Container>
          </Form>
          <ExamForm
            onCancel={onCancel}
            onFinish={onFinish}
            readonly={!edit}
            onEdit={() => setEdit(true)}
            initialValues={{ ...data, summary: data?.summary }}
            version={data?.updatedAt}
          />
        </>
      )}
    </Flex>
  );
};

export default Details;
