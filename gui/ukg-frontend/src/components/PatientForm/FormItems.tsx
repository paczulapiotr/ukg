import { Form as AntForm, Form, Input } from "antd";
import TextInput from "@/components/common/TextInput";
import DatePickerInput from "@/components/common/DatePickerInput";
import { getBirthdayFromPesel, validatePesel } from "@/utility/patient";
import { useEffect } from "react";
import { PatientFormModel } from "@/models";

export type Props = {
  readonly?: boolean;
};

const FormItems = ({ readonly = false }: Props) => {
  const form = Form.useFormInstance();
  const pesel = Form.useWatch("pesel");

  useEffect(() => {
    if (!readonly && validatePesel(pesel)) {
      form.setFieldsValue({ birthdayDate: getBirthdayFromPesel(pesel) });
    }
  }, [pesel]);

  return (
    <>
      <AntForm.Item name="id" hidden>
        <Input />
      </AntForm.Item>
      <TextInput<PatientFormModel>
        readonly={readonly}
        name="pesel"
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
      <TextInput<PatientFormModel>
        name="firstName"
        required
        readonly={readonly}
      />
      <TextInput<PatientFormModel>
        name="lastName"
        required
        readonly={readonly}
      />
      <DatePickerInput<PatientFormModel>
        name="birthdayDate"
        required
        readonly={readonly}
      />
    </>
  );
};

export default FormItems;
