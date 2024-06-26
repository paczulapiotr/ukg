import Container from "@/components/ExamForm/Container";
import { PatientForm } from "@/models";
import useAddPatient from "@/queries/useAddPatient";
import { getBirthdayFromPesel, validatePesel } from "@/utility/patient";
import { Button, Flex, Form, Space, message } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormItems from "./FormItems";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Upsert = () => {
  const [form] = Form.useForm<PatientForm>();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useAddPatient();

  const onFinish = async (values: PatientForm) => {
    try {
      await mutateAsync({
        firstName: values.FirstName,
        lastName: values.LastName,
        pesel: values.Pesel,
        birthday: values.BirthdayDate,
      });
      message.info("Pomyślnie zapisano pacjenta");
      form.resetFields();
    } catch (err) {
      message.error("Wystąpił błąd podczas zapisywania pacjenta");
    }
  };

  return (
    <Flex vertical flex={1}>
      <Form
        {...layout}
        initialValues={{ id }}
        disabled={false}
        form={form}
        name="add-patient"
        onFinish={onFinish}
        style={{ minWidth: "600px", flex: 1 }}
      >
        <Container name="1" focusedSection={"1"}>
          <FormItems />
        </Container>
      </Form>
      <Flex justify="flex-end">
        <Space>
          <Button>{"Anuluj"}</Button>
          <Button type="primary" onClick={form.submit}>
            {"Zapisz"}
          </Button>
        </Space>
      </Flex>
    </Flex>
  );
};

export default Upsert;
