import { PatientFormModel } from "@/models";
import useAddPatient from "@/queries/useAddPatient";
import { Button, Flex, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import PatientForm from "@/components/PatientForm/PatientForm";
import { ApiErrorCodes, hasErrorCode } from "@/utility/axios";

const Add = () => {
  const [form] = Form.useForm<PatientFormModel>();
  const { mutateAsync } = useAddPatient();
  const navigate = useNavigate();

  const onFinish = async (values: PatientFormModel) => {
    try {
      const id = await mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        pesel: values.pesel,
        birthday: values.birthdayDate,
      });
      message.success("Pomyślnie zapisano pacjenta");
      form.resetFields();
      navigate(`/patient/${id}`);
    } catch (err: any) {
      if (hasErrorCode(err, ApiErrorCodes.PeselUniquenessErrorCode)) {
        message.error("Wybrany pesel jest już przypisany do pacjenta");
      } else {
        message.error("Wystąpił błąd podczas zapisywania pacjenta");
      }
    }
  };

  return (
    <Flex vertical flex={1} gap={"1rem"}>
      <PageTitle title={"Dodaj pacjenta"} returnTo={`/patient/`} />
      <PatientForm form={form} onFinish={onFinish} />
      <Flex justify="flex-end" align="flex-end" flex={1} gap={"1rem"}>
        <Button onClick={() => navigate("/patient")}>{"Anuluj"}</Button>
        <Button type="primary" onClick={form.submit}>
          {"Zapisz"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Add;
