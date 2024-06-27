import { PatientFormModel } from "@/models";
import useAddPatient from "@/queries/useAddPatient";
import { Button, Flex, Form, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import PatientForm from "@/components/PatientForm/PatientForm";

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
    } catch (err) {
      message.error("Wystąpił błąd podczas zapisywania pacjenta");
    }
  };

  return (
    <Flex vertical flex={1} gap={"1rem"}>
      <PageTitle title={"Dodaj pacjenta"} returnTo={`/patient/`} />
      <PatientForm form={form} onFinish={onFinish} />
      <Flex justify="flex-end">
        <Space>
          <Button onClick={() => navigate("/patient")}>{"Anuluj"}</Button>
          <Button type="primary" onClick={form.submit}>
            {"Zapisz"}
          </Button>
        </Space>
      </Flex>
    </Flex>
  );
};

export default Add;
