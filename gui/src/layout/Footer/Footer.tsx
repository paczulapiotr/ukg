import VersionIcon from "@/components/VersionIcon/VersionIcon";
import { Flex, Layout } from "antd";

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <Flex justify="space-between">
        <span />
        {"©2024"}
        <VersionIcon />
      </Flex>
    </Layout.Footer>
  );
};

export default Footer;
