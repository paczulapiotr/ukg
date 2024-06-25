import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";
import styles from "./Input.module.scss";
import classNames from "classnames";

type Props = {
  name: keyof UkgExaminationForm;
  required?: boolean;
};

const TextInput = ({ name, required }: Props) => {
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
        rules={[{ required, message: t(`${name}_error`) }]}
      >
        <Input placeholder={t(name)} />
      </Form.Item>
    </>
  );
};

export default TextInput;
