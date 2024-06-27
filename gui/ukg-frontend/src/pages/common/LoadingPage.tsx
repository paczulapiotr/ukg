import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingPage = () => {
  return (
    <Flex
      align="middle"
      justify="center"
      flex={1}
      vertical
      style={{ minHeight: 300 }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  );
};

export default LoadingPage;
