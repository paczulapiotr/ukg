// Import necessary modules from antd and React
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../../auth/AuthProvider/useAuth";
import { useForm } from "antd/es/form/Form";

type LoginModel = {
  username: string;
  password: string;
};
const { Header, Content, Footer } = Layout;

const LoginPage = () => {
  const [form] = useForm<LoginModel>();
  const { login } = useAuth();

  const onFinish = ({ username, password }: LoginModel) => {
    login(username, password);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ textAlign: "center", padding: 0 }}>
        <h1>Login</h1>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {"Zaloguj"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2024</Footer>
    </Layout>
  );
};

export default LoginPage;
