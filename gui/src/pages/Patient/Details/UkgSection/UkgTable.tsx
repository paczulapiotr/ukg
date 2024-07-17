import { UkgListItem } from "@/queries/useGetUkgList";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Table, TableProps, Typography } from "antd";
import { Link } from "react-router-dom";
import { formatCompressedDateTime, formatDateTime } from "@/utility/date";
import { pageSizes } from "@/utility/table";
import { FilePdfOutlined } from "@ant-design/icons";
import { DownloadButton } from "@/components/common/DownloadButton";
import { minuteGuid } from "@/utility/common";

type Props = {
  patientId: string;
  isLoading: boolean;
  total: number;
  data: UkgListItem[];
  page: number;
  pageSize: number;
  onChange: TableProps<UkgListItem>["onChange"];
};

const UkgTable = ({
  patientId,
  isLoading,
  total,
  data,
  onChange,
  page,
  pageSize,
}: Props) => {
  const columns: ColumnsType<UkgListItem> = [
    {
      title: "Data dodania",
      dataIndex: "created",
      key: "created",
      render: (_, { created, id }) => (
        <Link to={`/patient/${patientId}/ukg/${id}`}>
          {formatDateTime(dayjs(created))}
        </Link>
      ),
      width: 170,
      align: "center",
    },
    {
      title: "Data aktualizacji",
      dataIndex: "updated",
      key: "updated",
      width: 170,
      render: (_, { updated }) =>
        updated ? formatDateTime(dayjs(updated)) : "-",
      align: "center",
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
    {
      title: "PDF",
      key: "pdf",
      align: "end",
      render: (_, { id, created }) => (
        <DownloadButton
          icon={<FilePdfOutlined />}
          url={`/ukg/pdf/${id}`}
          fileName={`Badanie_${formatCompressedDateTime(
            dayjs(created)
          )}_${minuteGuid()}$.pdf`}
        >
          {"Pobierz PDF"}
        </DownloadButton>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        total,
        pageSize,
        current: page,
        pageSizeOptions: pageSizes,
        showSizeChanger: true,
      }}
      onChange={onChange}
    />
  );
};

export default UkgTable;
