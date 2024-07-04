// Import necessary modules from antd and React
import { Button, Layout, Flex, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { Footer } from "../Footer";
import LoginDoctorSvg from "@/assets/login_doctor.svg";
import LoginForm, { LoginModel } from "./LoginForm";
import RegisterForm, { RegisterModel } from "./RegisterForm";
import { useState } from "react";

const { Content } = Layout;

const UnauthorizedLayout = () => {
  const [formMode, setFormMode] = useState<"login" | "register">("login");
  const [loginForm] = useForm<LoginModel>();
  const [registerForm] = useForm<RegisterModel>();

  const switchToRegister = () => {
    registerForm.resetFields();
    setFormMode("register");
  };

  const switchToLogin = () => {
    loginForm.resetFields();
    setFormMode("login");
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
            minWidth: "300px",
          }}
        >
          {formMode === "login" ? (
            <>
              <Typography.Title style={{ marginTop: 0 }} level={4}>
                {"Logowanie"}
              </Typography.Title>
              <LoginForm form={loginForm} />
              <Flex justify="space-between">
                <Button onClick={switchToRegister}>{"Utwórz konto"}</Button>
                <Button type="primary" onClick={loginForm.submit}>
                  {"Zaloguj"}
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Typography.Title style={{ marginTop: 0 }} level={4}>
                {"Tworzenie konta"}
              </Typography.Title>
              <RegisterForm form={registerForm} onRegistered={switchToLogin} />
              <Flex justify="space-between">
                <Button onClick={switchToLogin}>{"Anuluj"}</Button>
                <Button type="primary" onClick={registerForm.submit}>
                  {"Utwórz konto"}
                </Button>
              </Flex>
            </>
          )}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default UnauthorizedLayout;
