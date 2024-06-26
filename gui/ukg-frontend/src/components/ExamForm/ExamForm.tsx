import { Button, Flex, Form, message } from "antd";
import { UkgExaminationForm } from "../../models";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import { useState } from "react";
import Container from "../common/Container";
import { formLayout, formStyle } from "@/common/form";

type FocusedSection = "1" | "2" | "3" | "4" | "5" | "6";

type Props = {
  onFinish: (values: UkgExaminationForm) => Promise<void>;
  onCancel: () => void;
};

const ExamForm = ({ onFinish, onCancel }: Props) => {
  const [form] = Form.useForm<UkgExaminationForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedSection, setFocusedSection] = useState<FocusedSection>();

  const onCancelHandle = () => {
    form.resetFields();
    onCancel();
  };

  const onFinishHandle = async (values: UkgExaminationForm) => {
    try {
      setIsSubmitting(true);
      await onFinish(values);
      message.info("Pomyślnie dodano badanie");
      onCancelHandle();
    } catch (err) {
      console.error(err);
      message.error("Wystąpił błąd podczas dodawania badania");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        {...formLayout}
        disabled={isSubmitting}
        form={form}
        name="ukg-examination"
        onFinish={onFinishHandle}
        onSubmitCapture={(e) => console.log(e)}
        style={formStyle}
      >
        <Container<FocusedSection>
          name="1"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
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
          <TextAreaInput required name="Summary" />
        </Container>
      </Form>
      <Flex justify="flex-end" gap={"1rem"}>
        <Button disabled={isSubmitting} onClick={onCancelHandle}>
          {"Anuluj"}
        </Button>
        <Button disabled={isSubmitting} onClick={form.submit} type="primary">
          {"Dodaj"}
        </Button>
      </Flex>
    </div>
  );
};

export default ExamForm;
