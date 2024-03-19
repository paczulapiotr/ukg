// Import necessary modules from antd and React
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useAuth } from "../../auth/AuthProvider/useAuth";
import { Footer } from "../Footer";

type LoginModel = {
  username: string;
  password: string;
};
const { Header, Content } = Layout;

const UnauthorizedLayout = () => {
  const [form] = useForm<LoginModel>();
  const { login } = useAuth();

  const onFinish = ({ username, password }: LoginModel) => {
    login(username, password);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Footer />
    </Layout>
  );
};

export default UnauthorizedLayout;
