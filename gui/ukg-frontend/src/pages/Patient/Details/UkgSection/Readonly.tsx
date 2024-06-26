import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUkgData } from "../useUkgData";
import UkgTable from "./UkgTable";

type Props = { id: string; addNew: () => void };

const Readonly = ({ id, addNew }: Props) => {
  const tableProps = useUkgData(id);
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
      <UkgTable {...tableProps} />
    </>
  );
};

export default Readonly;
