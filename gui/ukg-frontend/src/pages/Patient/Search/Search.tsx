import useGetPatientList, {
  PatientListItem,
} from "@/queries/useGetPatientList";
import { Flex, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

const columns: ColumnsType<PatientListItem> = [
  {
    title: "Pacjent",
    dataIndex: "fullName",
    key: "fullName",
    render: (_, { firstName, lastName, id }) => (
      <Link to={`/patient/details/${id}`}>{`${firstName} ${lastName}`}</Link>
    ),
  },

  {
    title: "Wiek",
    dataIndex: "birthday",
    render: (birthday) =>
      dayjs().diff(dayjs(birthday), "year") +
      ` (${dayjs(birthday).format("DD MMM YYYY")})`,
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
  const [search, setSearch] = useState("");

  const {
    data: { data, total },
    isFetching,
  } = useGetPatientList(page, pageSize, search);

  return (
    <Flex vertical flex={1} gap={"1rem"}>
      <Input.Search
        placeholder="Imię / Nazwisko / PESEL"
        onSearch={setSearch}
        enterButton
      />
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
    </Flex>
  );
};

export default Search;
