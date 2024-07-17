import { Form as AntForm, Form, Input, Switch } from "antd";
import TextInput from "@/components/common/TextInput";
import DatePickerInput from "@/components/common/DatePickerInput";
import { getBirthdayFromPesel, validatePesel } from "@/utility/patient";
import { useEffect, useMemo } from "react";
import { PatientFormModel } from "@/models";

export type Props = {
  readonly?: boolean;
  initialValues?: Partial<PatientFormModel>;
};

const FormItems = ({ readonly = false, initialValues }: Props) => {
  const form = Form.useFormInstance();
  const pesel = Form.useWatch("pesel");
  const birthdayDate = Form.useWatch("birthdayDate");
  const overridePesel = Form.useWatch("overridePesel");

  const shouldValidatePesel = useMemo(
    () => !readonly && !overridePesel && pesel != initialValues?.pesel,
    [readonly, overridePesel, pesel, initialValues?.pesel]
  );

  useEffect(() => {
    if (!readonly && birthdayDate == null && validatePesel(pesel)) {
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
        required={shouldValidatePesel}
        rules={
          shouldValidatePesel
            ? [
                {
                  validator: (_, value) =>
                    validatePesel(value)
                      ? Promise.resolve()
                      : Promise.reject("Niepoprawny pesel"),
                  validateTrigger: "onBlur",
                },
              ]
            : []
        }
      />
      {readonly ? null : (
        <>
          <div />
          <div>
            <AntForm.Item
              name="overridePesel"
              hidden={false}
              label={"Nie sprawdzaj poprawności PESEL"}
              style={{ margin: 0, maxWidth: 270 }}
              colon={false}
              labelCol={{ style: { order: 2 } }}
            >
              <Switch size="small" />
            </AntForm.Item>
          </div>
        </>
      )}
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
