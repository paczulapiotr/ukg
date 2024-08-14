import { Button, Flex, Form, message } from "antd";
import { UkgExaminationForm } from "../../models";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import { useEffect, useState } from "react";
import Container from "../common/Container";
import { formLayout, formStyle } from "@/common/form";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import styles from "./ExamForm.module.scss";

type FocusedSection = "1" | "2" | "3" | "4" | "5" | "6" | "7";

type Props = {
  initialValues?: Partial<UkgExaminationForm>;
  readonly?: boolean;
  onFinish: (values: UkgExaminationForm) => Promise<void>;
  onCancel: () => void;
  onEdit?: () => void;
  version?: string;
};

const ExamForm = ({
  onFinish,
  onCancel,
  readonly,
  initialValues,
  onEdit,
  version,
}: Props) => {
  const [form] = Form.useForm<UkgExaminationForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedSection, setFocusedSection] = useState<FocusedSection>();

  useEffect(() => {
    if (version) {
      form.resetFields();
    }
  }, [version]);

  const className = classNames({ [styles.readonly]: readonly });
  const onCancelHandle = () => {
    form.resetFields();
    onCancel();
  };

  const onFinishHandle = async (values: UkgExaminationForm) => {
    try {
      setIsSubmitting(true);
      await onFinish(values);
      message.success("Pomyślnie zapisano badanie");
    } catch (err) {
      console.error(err);
      message.error("Wystąpił błąd podczas zapisywania badania");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Form
        initialValues={initialValues}
        {...formLayout}
        disabled={isSubmitting || readonly}
        form={form}
        name="ukg-examination"
        onFinish={onFinishHandle}
        style={formStyle}
        autoComplete="off"
      >
        <Container<FocusedSection>
          readonly={readonly}
          name="1"
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextInput<UkgExaminationForm> name="ao" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="acs" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="la" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="rv" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="ef" readonly={readonly} />
        </Container>
        <Container<FocusedSection>
          name="2"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextInput<UkgExaminationForm> name="lvs" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="lvd" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="ivss" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="ivsd" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="lvpws" readonly={readonly} />
          <TextInput<UkgExaminationForm> name="lvpwd" readonly={readonly} />
        </Container>
        <Container<FocusedSection>
          name="3"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput<UkgExaminationForm>
            name="kurczliwosc"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            name="osierdzie"
            readonly={readonly}
          />
        </Container>
        <Container<FocusedSection>
          name="4"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          {/* Zastawka mitralna */}
          <TextAreaInput<UkgExaminationForm>
            name="zastawkaMitralna"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            name="dopplerMitralna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="vmaxMitralna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="gmaxMitralna"
            readonly={readonly}
          />
        </Container>
        <Container<FocusedSection>
          name="5"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput<UkgExaminationForm>
            name="zastawkaAortalna"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            name="dopplerAortalna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="vmaxAortalna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="gmaxAortalna"
            readonly={readonly}
          />
        </Container>
        <Container<FocusedSection>
          name="6"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput<UkgExaminationForm>
            name="zastawkaTrojdzielna"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            name="dopplerTrojdzielna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="vmaxTrojdzielna"
            readonly={readonly}
          />
          <TextInput<UkgExaminationForm>
            name="gmaxTrojdzielna"
            readonly={readonly}
          />
        </Container>
        <Container<FocusedSection>
          name="7"
          readonly={readonly}
          setFocusedSection={setFocusedSection}
          focusedSection={focusedSection}
        >
          <TextAreaInput<UkgExaminationForm>
            name="zastawkaPnia"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            name="dopplerPnia"
            readonly={readonly}
          />
          <TextAreaInput<UkgExaminationForm>
            required
            name="summary"
            readonly={readonly}
          />
        </Container>
      </Form>
      <Flex justify="flex-end" gap={"1rem"}>
        {readonly ? (
          <>
            <Button disabled={isSubmitting} onClick={onCancelHandle}>
              {"Zamknij"}
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={onEdit}
              icon={<EditOutlined />}
            >
              {"Edytuj"}
            </Button>
          </>
        ) : (
          <>
            <Button disabled={isSubmitting} onClick={onCancelHandle}>
              {"Anuluj"}
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={form.submit}
              type="primary"
            >
              {"Zapisz"}
            </Button>
          </>
        )}
      </Flex>
    </div>
  );
};

export default ExamForm;
