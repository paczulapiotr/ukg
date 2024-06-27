import useGetPatientList, {
  PatientListItem,
} from "@/queries/useGetPatientList";
import { Button, Flex, Input, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { formatDate } from "@/utility/date";
import { defaultPageSize, pageSizes } from "@/utility/table";

const columns: ColumnsType<PatientListItem> = [
  {
    title: "Pacjent",
    dataIndex: "fullName",
    key: "fullName",
    render: (_, { firstName, lastName, id }) => (
      <Link to={`/patient/${id}`}>{`${firstName} ${lastName}`}</Link>
    ),
  },

  {
    title: "Wiek",
    dataIndex: "birthday",
    render: (birthday) =>
      dayjs().diff(dayjs(birthday), "year") +
      ` (${formatDate(dayjs(birthday))})`,
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
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: { data, total },
    isFetching,
  } = useGetPatientList(page, pageSize, search);

  return (
    <Flex vertical flex={1} gap={"1rem"}>
      <Flex justify="space-between">
        <Typography.Title level={4} style={{ margin: 0 }}>
          {"Wyszukaj pacjenta"}
        </Typography.Title>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate("/patient/add")}
        >
          {"Dodaj pacjenta"}
        </Button>
      </Flex>
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
          pageSizeOptions: pageSizes,
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
