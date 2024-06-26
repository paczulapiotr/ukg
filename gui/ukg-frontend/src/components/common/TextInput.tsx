import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../models";
import styles from "./Input.module.scss";
import classNames from "classnames";
import { Rule } from "antd/es/form";

type Props = {
  name: keyof UkgExaminationForm;
  required?: boolean;
  rules?: Rule[];
};

const TextInput = ({ name, required, rules }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography.Text className={classNames(styles.label, "focusable")}>{`${t(
        name
      )}:`}</Typography.Text>
      <Form.Item
        name={name}
        className={classNames(styles.input, "focusable")}
        required={required}
        rules={[{ required, message: t(`${name}_error`) }, ...(rules ?? [])]}
      >
        <Input placeholder={t(name)} />
      </Form.Item>
    </>
  );
};

export default TextInput;
