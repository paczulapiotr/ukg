import { Flex, Form, Typography } from "antd";

const Settings = () => {
  return (
    <Flex vertical gap={"1rem"} style={{ maxWidth: "600" }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {"Ustawienia"}
      </Typography.Title>
      <Form layout="vertical"></Form>
    </Flex>
  );
};

export default Settings;
