import { useAuth } from "@/auth/AuthProvider/useAuth";
import { Form, FormInstance, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";

type Props = {
  form: FormInstance;
};

export type LoginModel = {
  username: string;
  password: string;
};

const LoginForm = ({ form, children }: PropsWithChildren<Props>) => {
  const { login } = useAuth();

  const onFinish = async ({ username, password }: LoginModel) => {
    const result = await login(username, password);
    if (result === "incorrect_credentials") {
      message.error("Nieprawidłowe dane logowania");
    } else if (result === "internal_error") {
      message.error("Wystąpił nieznany błąd podczas logowania");
    }
  };
  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Wprowadź swój login" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Login" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Wprowadź swoje hasło" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Hasło" />
      </Form.Item>
      {children}
    </Form>
  );
};

export default LoginForm;
