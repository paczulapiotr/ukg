import { Form, DatePicker, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";
import styles from "./Input.module.scss";

type Props = {
  name: keyof UkgExaminationForm;
};
const DatePickerInput = ({ name }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography.Text className={styles.label}>{`${t(
        name
      )}:`}</Typography.Text>
      <Form.Item
        name={name}
        className={styles.input}
        style={{ width: "fit-content" }}
      >
        <DatePicker className={styles.border} format={"DD-MM-YYYY"} />
      </Form.Item>
    </>
  );
};

export default DatePickerInput;
