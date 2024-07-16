import { DownloadButton } from "@/components/common/DownloadButton";
import { Divider, Flex, Typography } from "antd";
import { FileOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { formatCompressedDateTime } from "@/utility/date";
import UpdateUserForm from "./UpdateUserForm";
import PageTitle from "@/components/common/PageTitle/PageTitle";
import { minuteGuid } from "@/utility/common";

const Settings = () => {
  return (
    <Flex vertical gap={"1rem"} style={{ maxWidth: "600" }} flex={1}>
      <PageTitle returnTo="/" title="Ustawienia" />
      <Divider />
      <Typography.Title level={5} style={{ margin: 0 }}>
        {"Edytuj profil"}
      </Typography.Title>
      <UpdateUserForm />
      <Flex flex={1} align="flex-end" justify="flex-end" vertical>
        <Divider />
        <DownloadButton
          icon={<FileOutlined />}
          url={`/ukg/export`}
          fileName={`Export_${formatCompressedDateTime(
            dayjs()
          )}_${minuteGuid()}.csv`}
        >
          {"Eksportuj dane do CSV"}
        </DownloadButton>
      </Flex>
    </Flex>
  );
};

export default Settings;
