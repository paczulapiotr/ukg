import { Layout } from "./layout";
import "./App.scss";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import dayjs from "dayjs";

dayjs.locale("pl");

function App() {
  return (
    <ConfigProvider locale={plPL}>
      <Layout />
    </ConfigProvider>
  );
}

export default App;
