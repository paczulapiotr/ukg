import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";
import styles from "./Input.module.scss";

type Props = {
  name: keyof UkgExaminationForm;
};

const TextInput = ({ name }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography.Text className={styles.label}>{`${t(
        name
      )}:`}</Typography.Text>
      <Form.Item name={name} className={styles.input}>
        <Input placeholder={t(name)} />
      </Form.Item>
    </>
  );
};

export default TextInput;
