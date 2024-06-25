import { Form, DatePicker, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";
import styles from "./Input.module.scss";
import classNames from "classnames";

type Props = {
  name: keyof UkgExaminationForm;
  required?: boolean;
};
const DatePickerInput = ({ name, required }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography.Text className={classNames(styles.label, "focusable")}>{`${t(
        name
      )}:`}</Typography.Text>
      <Form.Item
        name={name}
        className={classNames(styles.input, "focusable")}
        style={{ width: "fit-content" }}
        required={required}
        rules={[{ required, message: t(`${name}_error`) }]}
      >
        <DatePicker className={styles.border} format={"DD-MM-YYYY"} />
      </Form.Item>
    </>
  );
};

export default DatePickerInput;
