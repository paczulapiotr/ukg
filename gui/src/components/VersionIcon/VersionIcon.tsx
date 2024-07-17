import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import useGetApiStatus from "@/queries/useGetStatus";
import packageJson from "../../../package.json";
import { GithubOutlined } from "@ant-design/icons";

const VersionIcon = () => {
  const { data } = useGetApiStatus();

  return (
    <Tooltip
      title={
        <>
          <span>{`Wersja API: ${data?.version ?? "N/A"}`}</span>
          <br />
          <span>{`Wersja GUI: ${packageJson.version}`}</span>
          <br />
          <span>
            {"Kod źródłowy: "}
            <a href="https://github.com/paczulapiotr/ukg" target="_blank">
              <GithubOutlined />
            </a>
          </span>
        </>
      }
    >
      <InfoCircleOutlined />
    </Tooltip>
  );
};

export default VersionIcon;
