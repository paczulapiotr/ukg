import { Button, Form } from "antd";
import styles from "./ExamForm.module.scss";
import NumberSection from "./NumberSection";
import { UkgExaminationForm } from "../../models";
import TextInput from "./common/TextInput";
import TextAreaInput from "./common/TextAreaInput";
import DatePickerInput from "./common/DatePickerInput";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const editValue: Partial<UkgExaminationForm> = {
  ID: "123",
  FirstName: "Piotr",
  SecondName: "Paczula",
};

type Props = {};
const IDName: keyof UkgExaminationForm = "ID";
const ExamForm = ({}: Props) => {
  const [form] = Form.useForm<UkgExaminationForm>();

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
        <div className={styles["grid-container"]}>
          <TextInput name="PESEL" />
          <TextInput name="FirstName" />
          <TextInput name="SecondName" />

          <DatePickerInput name="BirthdayDate" />

          <TextInput name="Ao" />
          <TextInput name="ACS" />
          <TextInput name="LA" />
          <TextInput name="RV" />
          <TextInput name="EF" />
        </div>
        <NumberSection />
        <div className={styles["grid-container"]}>
          <TextAreaInput name="Kurczliwosc" />
          <TextAreaInput name="Osierdzie" />
        </div>
        <div className={styles["grid-container"]}>
          {/* Zastawka mitralna */}
          <TextAreaInput name="ZastawkaMitralna" />
          <TextAreaInput name="DopplerMitralna" />
          <TextInput name="VmaxMitralna" />
          <TextInput name="GmaxMitralna" />
        </div>
        <div className={styles["grid-container"]}>
          <TextAreaInput name="ZastawkaTrojdzielna" />
          <TextAreaInput name="DopplerTrojdzielna" />
          <TextInput name="VmaxTrojdzielna" />
          <TextInput name="GmaxTrojdzielna" />
        </div>
        <div className={styles["grid-container"]}>
          <TextAreaInput name="ZastawkaPnia" />
          <TextAreaInput name="DopplerPnia" />
          <TextAreaInput name="Summary" />
        </div>
      </Form>
      <Button onClick={() => form.submit()}>Save</Button>
    </div>
  );
};

export default ExamForm;
