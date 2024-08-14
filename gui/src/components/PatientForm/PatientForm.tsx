import { formLayout } from "@/common/form";
import { Form, FormInstance } from "antd";
import FormItems from "./FormItems";
import Container from "@/components/common/Container";
import { useState } from "react";
import { PatientFormModel } from "@/models";
import classNames from "classnames";

type Props = {
  patient?: PatientFormModel;
  readonly?: boolean;
  onFinish?: (values: PatientFormModel) => Promise<void>;
  form: FormInstance<PatientFormModel>;
};

const PatientForm = ({ form, patient, readonly, onFinish }: Props) => {
  const [focusedSection, setFocusedSection] = useState<string>();

  return (
    <Form
      {...formLayout}
      initialValues={patient}
      disabled={readonly}
      className={classNames({ ["readonly-form"]: readonly })}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Container
        name="1"
        readonly={readonly}
        setFocusedSection={setFocusedSection}
        focusedSection={focusedSection}
      >
        <FormItems readonly={readonly} initialValues={patient} />
      </Container>
    </Form>
  );
};

export default PatientForm;
