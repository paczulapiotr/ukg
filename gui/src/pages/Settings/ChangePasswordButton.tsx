import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { useAuth } from "@/auth/AuthProvider/useAuth";
import instance from "@/services/api";
import { ApiErrorCodes, hasErrorCode } from "@/utility/axios";

export type ChangePasswordModel = {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const ChangePasswordButton = () => {
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { refreshToken } = useAuth();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async ({
    currentPassword,
    newPassword,
    repeatPassword,
  }: ChangePasswordModel) => {
    try {
      setSubmitting(true);
      await instance.put("/auth/password", {
        currentPassword,
        newPassword,
        repeatPassword,
      });
      await refreshToken();
      setOpen(false);
      message.success("Pomyślnie zaktualizowano hasło");
      form.resetFields();
    } catch (err) {
      if (hasErrorCode(err, ApiErrorCodes.PasswordsNotMatching)) {
        message.error("Hasła nie są takie same");
      } else if (hasErrorCode(err, ApiErrorCodes.PasswordsFormatIncorrect)) {
        message.error("Hasło musi zawierać co najmniej 6 znaków");
      } else {
        message.error("Wystąpił błąd podczas aktualizacji hasla");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title="Zmiana hasła"
        open={open}
        onCancel={onClose}
        okText="Aktualizuj"
        onOk={form.submit}
        confirmLoading={submitting}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Aktualne hasło"
            name={"currentPassword"}
            rules={[
              { required: true, message: "Wprowadź swoje aktualne hasło" },
            ]}
          >
            <Input placeholder="Aktualne hasło" type="password" />
          </Form.Item>
          <Form.Item
            label="Nowe hasło"
            name={"newPassword"}
            rules={[{ required: true, message: "Wprowadź swoje nowe hasło" }]}
          >
            <Input placeholder="Nowe hasło" type="password" />
          </Form.Item>
          <Form.Item
            label="Powtórz hasło"
            name={"repeatPassword"}
            rules={[{ required: true, message: "Powtórz swoje nowe hasło" }]}
          >
            <Input placeholder="Powtórz hasło" type="password" />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={() => setOpen(true)} icon={<LockOutlined />}>
        {"Zmień hasło"}
      </Button>
    </>
  );
};

export default ChangePasswordButton;
