import useGetPatientList, { UkgPatientItem } from "@/queries/useGetPatientList";
import useGetUkgList, { UkgListItem } from "@/queries/useGetUkgList";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";

const columns: ColumnsType<UkgPatientItem> = [
  {
    title: "FullName",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <a>{text}</a>,
    onCell: (record, index) => ({ onClick: () => console.log(record, index) }),
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    render: (birthday) => dayjs().diff(dayjs(birthday), "year"),
    key: "birthday",
  },
  {
    title: "PESEL",
    dataIndex: "pesel",
    key: "pesel",
  },
];

const Search = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const {
    data: { data, total },
    isFetching,
  } = useGetPatientList(page, pageSize);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isFetching}
      pagination={{
        total,
        pageSize,
        current: page,
        pageSizeOptions: [2, 5, 10, 20],
        showSizeChanger: true,
      }}
      onChange={(pagination, _filters, _sorter) => {
        setPage(pagination.current || 1);
        setPageSize(pagination.pageSize || 10);
      }}
    />
  );
};

export default Search;
