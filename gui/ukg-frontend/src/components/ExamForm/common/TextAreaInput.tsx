import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";

type Props = {
  name: keyof UkgExaminationForm;
};

const TextAreaInput = ({ name }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography>{`${t(name)}:`}</Typography>
      <Form.Item name={name}>
        <Input.TextArea
          placeholder={t(name)}
          autoSize={{ minRows: 2, maxRows: 10 }}
        />
      </Form.Item>
    </>
  );
};

export default TextAreaInput;
