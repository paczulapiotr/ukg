import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";

type Props = {
  name: keyof UkgExaminationForm;
};

const TextInput = ({ name }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography>{`${t(name)}:`}</Typography>
      <Form.Item name={name}>
        <Input placeholder={t(name)} />
      </Form.Item>
    </>
  );
};

export default TextInput;
