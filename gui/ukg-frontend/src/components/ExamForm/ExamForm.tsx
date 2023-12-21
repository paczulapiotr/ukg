import { Button, Form } from "antd";
import styles from "./ExamForm.module.scss";
import NumberSection from "./NumberSection";
import { UkgExaminationForm } from "../../models";
import { useTranslation } from "react-i18next";
import TextInput from "./common/TextInput";
import TextAreaInput from "./common/TextAreaInput";
import DatePickerInput from "./common/DatePickerInput";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type Props = {};

const ExamForm = ({}: Props) => {
  const [form] = Form.useForm<UkgExaminationForm>();
  const { t } = useTranslation("common");
  const onFinish = (values: UkgExaminationForm) => {
    console.log(values);
    console.log("Date:", values.Birthday.format("DD/MM/YYYY"));
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
        onSubmitCapture={(e) => console.log(e)}
        style={{ minWidth: "600px" }}
      >
        <div className={styles["grid-container"]}>
          <TextInput name="PESEL" />
          <TextInput name="FirstName" />
          <TextInput name="SecondName" />

          <DatePickerInput name="Birthday" />

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
