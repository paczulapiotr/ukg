import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./Input.module.scss";
import classNames from "classnames";
import { Rule } from "antd/es/form";

type Props<TForm> = {
  name: keyof TForm;
  required?: boolean;
  readonly?: boolean;
  rules?: Rule[];
};

const TextInput = <TForm,>({
  name: formName,
  required,
  readonly,
  rules,
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
        required={required}
        rules={[{ required, message: t(`${name}_error`) }, ...(rules ?? [])]}
      >
        <Input placeholder={t(name)} />
      </Form.Item>
    </>
  );
};

export default TextInput;
