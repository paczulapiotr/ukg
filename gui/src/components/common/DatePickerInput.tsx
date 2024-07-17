import { Form, DatePicker, Typography } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./Input.module.scss";
import classNames from "classnames";

type Props<TForm> = {
  name: keyof TForm;
  required?: boolean;
  readonly?: boolean;
};
const DatePickerInput = <TForm,>({
  name: formName,
  required,
  readonly,
}: Props<TForm>) => {
  const { t } = useTranslation("form");
  const name = String(formName);

  return (
    <>
      <Typography.Text
        className={classNames(styles.label, "focusable", {
          [styles.readonly]: readonly,
        })}
      >{`${t(name)}:`}</Typography.Text>
      <Form.Item
        name={name}
        className={classNames(styles.input, "focusable", {
          [styles.readonly]: readonly,
        })}
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
