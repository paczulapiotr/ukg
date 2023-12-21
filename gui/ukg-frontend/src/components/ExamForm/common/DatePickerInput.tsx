import { Form, DatePicker, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../../models";

type Props = {
  name: keyof UkgExaminationForm;
};
const DatePickerInput = ({ name }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography>{`${t(name)}:`}</Typography>
      <Form.Item name={name}>
        <DatePicker />
      </Form.Item>
    </>
  );
};

export default DatePickerInput;
