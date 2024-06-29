import { Button, Flex, Form, Input } from "antd";
import { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
export type UpdateDoctorModel = {
  id: string;
  login: string;
  fullName: string;
};

type Props = {
  onFinished: (value: UpdateDoctorModel) => Promise<void>;
  initialValues: UpdateDoctorModel;
};

const UpdateUserForm = ({ onFinished, initialValues }: Props) => {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const onCancel = () => {
    setEdit(false);
    form.resetFields();
  };
  const onChangePassword = () => {};

  return (
    <Flex vertical gap={"1rem"}>
      <Form
        disabled={!edit}
        form={form}
        layout="vertical"
        onFinish={onFinished}
        initialValues={initialValues}
      >
        <Form.Item name="id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item name="login" label="Login">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Tytuł / Imie / Nazwisko"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Flex justify="end" gap={"1rem"}>
        {edit ? (
          <>
            <Button onClick={onCancel}>{"Anuluj"}</Button>
            <Button type="primary" onClick={form.submit}>
              {"Zapisz"}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onChangePassword} icon={<LockOutlined />}>
              {"Zmień hasło"}
            </Button>
            <Button onClick={() => setEdit(true)}>{"Edytuj"}</Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default UpdateUserForm;
