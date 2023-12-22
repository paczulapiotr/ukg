import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  name: string;
  age: number;
  pesel: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    onCell: (record, index) => ({ onClick: () => console.log(record, index) }),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "PESEL",
    dataIndex: "pesel",
    key: "pesel",
  },
];
const data: DataType[] = [
  {
    id: "1234",
    name: "Piotr Paczuła",
    age: 26,
    pesel: "97042708474",
  },
];

const Search = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default Search;
