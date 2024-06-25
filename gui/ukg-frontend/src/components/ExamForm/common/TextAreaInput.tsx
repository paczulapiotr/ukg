import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";
import styles from "./Input.module.scss";
import classNames from "classnames";

type Props = {
  name: keyof UkgExaminationForm;
  required?: boolean;
};

const TextAreaInput = ({ name, required }: Props) => {
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
        <Input.TextArea
          placeholder={t(name)}
          autoSize={{ minRows: 1, maxRows: 10 }}
        />
      </Form.Item>
    </>
  );
};

export default TextAreaInput;
