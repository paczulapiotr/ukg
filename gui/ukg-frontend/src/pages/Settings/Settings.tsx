import { DownloadButton } from "@/components/common/DownloadButton";
import { Divider, Flex, Typography } from "antd";
import { FileOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { formatCompressedDateTime } from "@/utility/date";

const Settings = () => {
  return (
    <Flex vertical gap={"1rem"} style={{ maxWidth: "600" }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {"Ustawienia"}
      </Typography.Title>
      <Divider />
      <Flex>
        <DownloadButton
          icon={<FileOutlined />}
          url={`/ukg/export`}
          fileName={`Export_${formatCompressedDateTime(dayjs())}.csv`}
        >
          {"Eksportuj dane do CSV"}
        </DownloadButton>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Settings;
