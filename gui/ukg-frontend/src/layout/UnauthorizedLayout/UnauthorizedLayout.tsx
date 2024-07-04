// Import necessary modules from antd and React
import { Form, Input, Button, Layout, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useAuth } from "../../auth/AuthProvider/useAuth";
import { Footer } from "../Footer";
import LoginDoctorSvg from "@/assets/login_doctor.svg";
type LoginModel = {
  username: string;
  password: string;
};
const { Content } = Layout;

const UnauthorizedLayout = () => {
  const [form] = useForm<LoginModel>();
  const { login } = useAuth();

  const onFinish = ({ username, password }: LoginModel) => {
    login(username, password);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${LoginDoctorSvg})`,
        backgroundRepeat: "no-repeat", // This prevents the background image from repeating
        backgroundPosition: "center", // This centers the background image
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 1)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
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
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Hasło"
              />
            </Form.Item>
            <Flex justify="space-between">
              <Button>{"Utwórz konto"}</Button>
              <Button type="primary" htmlType="submit">
                {"Zaloguj"}
              </Button>
            </Flex>
          </Form>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default UnauthorizedLayout;
