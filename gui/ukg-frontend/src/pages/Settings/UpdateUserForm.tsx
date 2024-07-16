import { Button, Flex, Form, Input, message } from "antd";
import { useState } from "react";
import ChangePasswordButton from "./ChangePasswordButton";
import { useAuth } from "@/auth/AuthProvider/useAuth";
import instance from "@/services/api";
export type UpdateDoctorModel = {
  login: string;
  fullName: string;
};

const UpdateUserForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { auth, refreshToken } = useAuth();
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);

  const onCancel = () => {
    setEdit(false);
    form.resetFields();
  };

  const onFinished = async (values: UpdateDoctorModel) => {
    try {
      setSubmitting(true);
      await instance.put("/auth/user", { fullName: values.fullName });
      await refreshToken();
      form.setFieldValue("fullName", values.fullName);
      setEdit(false);
      message.success("Pomyślnie zaktualizowano dane");
    } catch (err) {
      console.error(err);
      message.error("Wystąpił błąd podczas aktualizacji danych");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex vertical gap={"1rem"}>
      <Form
        disabled={!edit}
        form={form}
        layout="vertical"
        onFinish={onFinished}
        initialValues={{
          login: auth.user?.username ?? "",
          fullName: auth.user?.fullName ?? "",
        }}
      >
        <Form.Item name="login" label="Login" required>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Tytuł / Imię / Nazwisko"
          rules={[
            {
              required: true,
              message: "Wprowadź swój tytuł, imię i nazwisko",
            },
            {
              min: 3,
              message: "Minimalna długość to 3 znaki",
            },
            {
              max: 100,
              message: "Maksymalna długość to 100 znaków",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Flex justify="end" gap={"1rem"}>
        {edit ? (
          <>
            <Button onClick={onCancel} disabled={submitting}>
              {"Anuluj"}
            </Button>
            <Button type="primary" onClick={form.submit} loading={submitting}>
              {"Zapisz"}
            </Button>
          </>
        ) : (
          <>
            <ChangePasswordButton />
            <Button onClick={() => setEdit(true)}>{"Edytuj"}</Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default UpdateUserForm;
