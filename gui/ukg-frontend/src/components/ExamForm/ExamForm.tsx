import { Button, Form } from "antd";
import { UkgExaminationForm } from "../../models";
import TextInput from "./common/TextInput";
import TextAreaInput from "./common/TextAreaInput";
import DatePickerInput from "./common/DatePickerInput";
import { useState } from "react";
import Container from "./Container";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const editValue: Partial<UkgExaminationForm> = {
  ID: "123",
  FirstName: "Piotr",
  SecondName: "Paczula",
};

type FocusedSection = "1" | "2" | "3" | "4" | "5" | "6";

type Props = {};

const IDName: keyof UkgExaminationForm = "ID";
const ExamForm = ({}: Props) => {
  const [form] = Form.useForm<UkgExaminationForm>();
  const [focusedSection, setFocusedSection] = useState<FocusedSection>();
  const onFinish = (values: UkgExaminationForm) => {
    console.log(values);
    console.log("Date:", values.BirthdayDate?.format("DD/MM/YYYY"));
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="ukg-examination"
        onFinish={onFinish}
        initialValues={editValue}
        onSubmitCapture={(e) => console.log(e)}
        style={{ minWidth: "600px" }}
      >
        <Form.Item name={IDName} hidden />
        <Container<FocusedSection>
          name="1"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextInput name="PESEL" />
          <TextInput name="FirstName" />
          <TextInput name="SecondName" />
          <DatePickerInput name="BirthdayDate" />

          <TextInput name="Ao" />
          <TextInput name="ACS" />
          <TextInput name="LA" />
          <TextInput name="RV" />
          <TextInput name="EF" />
        </Container>
        <Container<FocusedSection>
          name="2"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextInput name="LVs" />
          <TextInput name="LVd" />
          <TextInput name="IVSs" />
          <TextInput name="IVSd" />
          <TextInput name="LVPWs" />
          <TextInput name="LVPWd" />
        </Container>
        <Container<FocusedSection>
          name="3"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput name="Kurczliwosc" />
          <TextAreaInput name="Osierdzie" />
        </Container>
        <Container<FocusedSection>
          name="4"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          {/* Zastawka mitralna */}
          <TextAreaInput name="ZastawkaMitralna" />
          <TextAreaInput name="DopplerMitralna" />
          <TextInput name="VmaxMitralna" />
          <TextInput name="GmaxMitralna" />
        </Container>
        <Container<FocusedSection>
          name="5"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput name="ZastawkaTrojdzielna" />
          <TextAreaInput name="DopplerTrojdzielna" />
          <TextInput name="VmaxTrojdzielna" />
          <TextInput name="GmaxTrojdzielna" />
        </Container>
        <Container<FocusedSection>
          name="6"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput name="ZastawkaPnia" />
          <TextAreaInput name="DopplerPnia" />
          <TextAreaInput name="Summary" />
        </Container>
      </Form>
      <Button onClick={() => form.submit()}>Save</Button>
    </div>
  );
};

export default ExamForm;
