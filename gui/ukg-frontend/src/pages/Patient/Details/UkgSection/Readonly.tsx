import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUkgData } from "../useUkgData";
import UkgTable from "./UkgTable";

type Props = { patientId: string; addNew: () => void };

const Readonly = ({ patientId, addNew }: Props) => {
  const tableProps = useUkgData(patientId);
  const noUkgs = tableProps.total === 0;

  return noUkgs ? (
    <Flex justify="flex-end" flex={1} align="flex-end">
      <Button icon={<PlusOutlined />} onClick={addNew}>
        {"Nowe badanie"}
      </Button>
    </Flex>
  ) : (
    <>
      <Flex flex={1} justify="space-between" align="center">
        <Typography.Title level={4}>{"Badania"}</Typography.Title>
        <Button icon={<PlusOutlined />} onClick={addNew}>
          {"Nowe badanie"}
        </Button>
      </Flex>
      <UkgTable patientId={patientId} {...tableProps} />
    </>
  );
};

export default Readonly;
