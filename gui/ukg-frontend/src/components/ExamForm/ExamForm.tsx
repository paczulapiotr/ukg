import { DatePicker, Form, Input, Typography } from "antd";
import styles from "./ExamForm.module.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type Props = {};

const ExamForm = ({}: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="ukg-examination"
      onFinish={onFinish}
      style={{ minWidth: "600px" }}
    >
      <div className={styles["grid-container"]}>
        <>
          <Typography>PESEL:</Typography>
          <Input placeholder="PESEL" />
        </>
        <>
          <Typography>Imię i nazwisko:</Typography>
          <Input placeholder="Imię i nazwisko" />
        </>
        <>
          <Typography>Data urodzenia:</Typography>
          <DatePicker />
        </>
        <>
          <Typography>Ao:</Typography>
          <Input placeholder="Ao" />
        </>
        <>
          <Typography>Acs:</Typography>
          <Input placeholder="Acs" />
        </>
        <>
          <Typography>LA:</Typography>
          <Input placeholder="LA" />
        </>
        <>
          <Typography>RV:</Typography>
          <Input placeholder="RV" />
        </>
        <>
          <Typography>Kurczliwość:</Typography>
          <Input.TextArea
            placeholder="Kurczliwość"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        <>
          <Typography>Osierdzie:</Typography>
          <Input.TextArea
            placeholder="Osierdzie"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Zastawka mitralna */}
        <>
          <Typography>Zastawka mitralna:</Typography>
          <Input.TextArea
            placeholder="Zastawka mitralna"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Badanie dopplerowskie */}
        <>
          <Typography>Badanie dopplerowskie:</Typography>
          <Input.TextArea
            placeholder="Badanie dopplerowskie"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Vmax */}
        <>
          <Typography>Vmax:</Typography>
          <Input placeholder="Vmax" />
        </>
        {/* Gmax */}
        <>
          <Typography>Gmax:</Typography>
          <Input placeholder="Gmax" />
        </>
        {/* Zastawka trójdzielna */}
        <>
          <Typography>Zastawka trójdzielna:</Typography>
          <Input.TextArea
            placeholder="Zastawka trójdzielna"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Badanie dopplerowskie */}
        <>
          <Typography>Badanie dopplerowskie:</Typography>
          <Input.TextArea
            placeholder="Badanie dopplerowskie"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        </>
        {/* Vmax */}
        <>
          <Typography>Vmax:</Typography>
          <Input placeholder="Vmax" />
        </>
        {/* Gmax */}
        <>
          <Typography>Gmax:</Typography>
          <Input placeholder="Gmax" />
        </>
        {/* Zastawka pnia płucnego */}
        <>
          <Typography>Zastawka pnia płucnego:</Typography>
          <Input.TextArea
            placeholder="Zastawka pnia płucnego"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Badanie dopplerowskie */}
        <>
          <Typography>Badanie dopplerowskie:</Typography>
          <Input.TextArea
            placeholder="Badanie dopplerowskie"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
        {/* Wnioski */}
        <>
          <Typography>Wnioski:</Typography>
          <Input.TextArea
            placeholder="Wnioski"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </>
      </div>
    </Form>
  );
};

export default ExamForm;
