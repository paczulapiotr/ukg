import { Layout } from "./layout";
import "./App.scss";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import plCommon from "./i18n/pl/common.json";
import plForm from "./i18n/pl/form.json";
import dayjs from "dayjs";
import { BrowserRouter } from "react-router-dom";

dayjs.locale("pl");

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AuthProvider from "./auth/AuthProvider/AuthProvider";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      pl: {
        common: plCommon,
        form: plForm,
      },
    },
    lng: "pl", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ConfigProvider locale={plPL}>
          <Layout />
        </ConfigProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
