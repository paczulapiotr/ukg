import { Form as AntForm, Form, Input } from "antd";
import TextInput from "@/components/common/TextInput";
import DatePickerInput from "@/components/common/DatePickerInput";
import { getBirthdayFromPesel, validatePesel } from "@/utility/patient";
import { useEffect } from "react";

export type Props = {
  readonly?: boolean;
};

const FormItems = ({ readonly = false }: Props) => {
  const form = Form.useFormInstance();
  const pesel = Form.useWatch("Pesel");

  useEffect(() => {
    if (!readonly && validatePesel(pesel)) {
      form.setFieldsValue({ BirthdayDate: getBirthdayFromPesel(pesel) });
    }
  });

  return (
    <>
      <AntForm.Item name="id" hidden>
        <Input />
      </AntForm.Item>
      <TextInput
        name="Pesel"
        required
        rules={[
          {
            validator: (_, value) =>
              validatePesel(value)
                ? Promise.resolve()
                : Promise.reject("Niepoprawny pesel"),
            validateTrigger: "onBlur",
          },
        ]}
      />
      <TextInput name="FirstName" required />
      <TextInput name="LastName" required />
      <DatePickerInput name="BirthdayDate" required />
    </>
  );
};

export default FormItems;
