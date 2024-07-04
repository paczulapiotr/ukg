import { useAuth } from "@/auth/AuthProvider/useAuth";
import { Form, FormInstance, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

type Props = {
  form: FormInstance;
  onRegistered: () => void;
};

export type RegisterModel = {
  username: string;
  password: string;
  repeatPassword: string;
  fullName: string;
};

const RegisterForm = ({ form, onRegistered }: Props) => {
  const { register } = useAuth();

  const onFinish = async ({
    username,
    fullName,
    password,
    repeatPassword,
  }: RegisterModel) => {
    const result = await register(fullName, username, password, repeatPassword);
    if (result) {
      message.success("Konto zostało utworzone");
      onRegistered();
    } else {
      message.error("Wystąpił błąd podczas tworzenia konta");
    }
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        name="fullName"
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
        <Input prefix={<UserOutlined />} placeholder="Tytuł, imię i nazwisko" />
      </Form.Item>
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
      <Form.Item
        name="repeatPassword"
        rules={[{ required: true, message: "Powtórz swoje hasło" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Powtórz hasło"
        />
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
