import { UkgListItem } from "@/queries/useGetUkgList";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Table, TableProps, Typography } from "antd";

type Props = {
  isLoading: boolean;
  total: number;
  data: UkgListItem[];
  page: number;
  pageSize: number;
  onChange: TableProps<UkgListItem>["onChange"];
};

const columns: ColumnsType<UkgListItem> = [
  {
    title: "Data dodania",
    dataIndex: "created",
    key: "created",
    render: (_, { created }) => dayjs(created).format("DD MMM YYYY"),
    width: 150,
  },
  {
    title: "Data aktualizacji",
    dataIndex: "updated",
    key: "updated",
    width: 150,
    render: (_, { updated }) =>
      updated ? dayjs(updated).format("DD MMM YYYY") : "-",
  },
  {
    title: "Podsumowanie",
    dataIndex: "summary",
    key: "summary",
    ellipsis: true,
    render: (_, { summary }) => (
      <Typography.Text ellipsis title={summary}>
        {summary}
      </Typography.Text>
    ),
  },
];

const UkgTable = ({
  isLoading,
  total,
  data,
  onChange,
  page,
  pageSize,
}: Props) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        total,
        pageSize,
        current: page,
        pageSizeOptions: [2, 5, 10, 20],
        showSizeChanger: true,
      }}
      onChange={onChange}
    />
  );
};

export default UkgTable;
