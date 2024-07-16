import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import useGetApiStatus from "@/queries/useGetStatus";
import packageJson from "../../../package.json";

const VersionIcon = () => {
  const { data } = useGetApiStatus();

  return (
    <Tooltip
      title={
        <>
          <span>{`Wersja API: ${data?.version ?? "N/A"}`}</span>
          <br />
          <span>{`Wersja GUI: ${packageJson.version}`}</span>
        </>
      }
    >
      <InfoCircleOutlined />
    </Tooltip>
  );
};

export default VersionIcon;
