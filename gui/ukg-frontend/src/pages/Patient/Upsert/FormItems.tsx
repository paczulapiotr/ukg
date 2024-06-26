import { Form as AntForm, Form, Input } from "antd";
import TextInput from "@/components/ExamForm/common/TextInput";
import DatePickerInput from "@/components/ExamForm/common/DatePickerInput";
import { getBirthdayFromPesel, validatePesel } from "@/utility/patient";
import { useEffect } from "react";

const FormItems = () => {
  const form = Form.useFormInstance();
  const pesel = Form.useWatch("Pesel");

  useEffect(() => {
    debugger;
    if (validatePesel(pesel)) {
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
